import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Chip,
  Alert,
  SelectChangeEvent,
  FormHelperText
} from '@mui/material';
import { ApiKeyService } from './ApiKeyService';
import { ApiKey } from '@/types/chatbot';
import { ChatbotConfigService, ChatbotConfig, CONFIG_STORAGE_KEY } from '@/tien_ich/chatbotConfig';

// Interface định nghĩa cho cấu hình active provider
type ActiveProviderConfig = ChatbotConfig;

export default function ChatbotApiKeySelector() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('deepseek');
  const [selectedApiKeyId, setSelectedApiKeyId] = useState<number | null>(null);
  const [activeConfig, setActiveConfig] = useState<ActiveProviderConfig | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [filteredKeys, setFilteredKeys] = useState<ApiKey[]>([]);

  const providers = [
    { value: 'deepseek', label: 'DeepSeek' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'mistral', label: 'Mistral AI' }
  ];

  // Lấy danh sách API keys và cấu hình hiện tại
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading API keys and configuration...');
      // Fetch all API keys
      const keys = await ApiKeyService.getApiKeys();
      console.log('Loaded API keys:', keys);
      setApiKeys(keys);

      // Get active configuration
      const config = ChatbotConfigService.getConfig();
      console.log('Current configuration:', config);
      
      if (config) {
        setActiveConfig(config);
        setSelectedProvider(config.provider);
        setSelectedApiKeyId(config.apiKeyId);
      } else {
        // Set default provider if no config exists
        setSelectedProvider('deepseek');
        console.log('No active configuration found, using default provider: deepseek');
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Lỗi khi tải dữ liệu: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Use a useEffect to filter API keys when provider changes or when API keys are loaded
  useEffect(() => {
    const filtered = selectedProvider
      ? apiKeys.filter(key => key.provider === selectedProvider && key.is_active)
      : [];
    
    console.log(`Filtered keys for provider ${selectedProvider}:`, filtered);
    setFilteredKeys(filtered);
    
    // If no keys are available for the selected provider and we had a selected key, unselect it
    if (filtered.length === 0 && selectedApiKeyId) {
      setSelectedApiKeyId(null);
    }
    
    // If no key is selected but we have filtered keys, select the first one
    if (!selectedApiKeyId && filtered.length > 0) {
      setSelectedApiKeyId(filtered[0].id);
    }
  }, [selectedProvider, apiKeys, selectedApiKeyId]);

  // Xử lý khi thay đổi provider
  const handleProviderChange = (event: SelectChangeEvent<string>) => {
    const newProvider = event.target.value;
    console.log(`Provider changed to: ${newProvider}`);
    setSelectedProvider(newProvider);
    setSelectedApiKeyId(null); // Reset selected API key when provider changes
    
    // Show warning if no API keys are available for this provider
    const keysForProvider = apiKeys.filter(key => key.provider === newProvider && key.is_active);
    if (keysForProvider.length === 0) {
      setError(`Không có API key đang hoạt động nào cho provider ${newProvider}. Vui lòng thêm API key trong tab quản lý API keys.`);
    } else {
      setError(null);
    }
  };

  // Xử lý khi thay đổi API key
  const handleApiKeyChange = (event: SelectChangeEvent<number>) => {
    setSelectedApiKeyId(Number(event.target.value));
  };

  // Tạo tùy chọn test API key
  const testApiKey = async () => {
    if (!selectedProvider || !selectedApiKeyId) {
      setError('Vui lòng chọn provider và API key để kiểm tra');
      return;
    }

    try {
      setLoading(true);
      
      // Tạo URL endpoint dựa trên provider được chọn
      const testEndpoint = `/api/test-${selectedProvider}`;
      
      // Gọi endpoint test
      const response = await fetch(testEndpoint);
      const data = await response.json();
      
      if (data.results && data.results.some((result: { success: boolean }) => result.success)) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const errorMessage = data.results?.[0]?.error || 'Kiểm tra API key thất bại';
        setError(`Lỗi kết nối: ${errorMessage}`);
      }
    } catch (err) {
      console.error('Error testing API key:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi kiểm tra API key');
    } finally {
      setLoading(false);
    }
  };

  // Lưu cấu hình
  const saveConfig = () => {
    try {
      if (!selectedProvider || !selectedApiKeyId) {
        setError('Vui lòng chọn provider và API key');
        return;
      }

      // Xóa cấu hình hiện tại trước
      localStorage.removeItem(CONFIG_STORAGE_KEY);
      console.log('Removed existing config from localStorage');

      const config: ChatbotConfig = {
        provider: selectedProvider,
        apiKeyId: selectedApiKeyId
      };

      console.log('Saving config to localStorage:', config);
      
      // Sử dụng service để lưu cấu hình
      const success = ChatbotConfigService.saveConfig(config);
      
      if (!success) {
        setError('Lưu cấu hình không thành công. Vui lòng thử lại.');
        return;
      }
      
      // Kiểm tra xem cấu hình đã được lưu đúng chưa
      const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
      console.log('Config saved in localStorage:', savedConfig);
      
      // Cập nhật trạng thái local
      setActiveConfig(config);
      setSaveSuccess(true);
      
      // Tạo sự kiện để thông báo cho các components khác
      const configChangeEvent = new CustomEvent('chatbotConfigChanged', { 
        detail: config 
      });
      window.dispatchEvent(configChangeEvent);
      
      // Cải thiện: tải lại trang ngay lập tức để đảm bảo cấu hình mới được sử dụng
      console.log('Sẽ tải lại trang sau 1 giây để áp dụng cấu hình mới');
      setTimeout(() => {
        console.log('Tải lại trang để áp dụng cấu hình mới');
        window.location.reload();
      }, 1000);
      
      console.log(`Đã lưu cấu hình: Provider ${config.provider}, API Key ID ${config.apiKeyId}`);
    } catch (err) {
      console.error('Error saving config:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi lưu cấu hình');
    }
  };
  
  // Tạo tùy chọn tải lại trang để đảm bảo config được áp dụng
  const forceReload = () => {
    window.location.reload();
  };

  // Add a navigation function to go to API key management
  const navigateToApiKeyManagement = () => {
    // You can customize this URL based on your routing structure
    window.location.href = '/admin/chatbot/api-keys';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cấu hình API Chatbot
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            error.includes('API key') && (
              <Button 
                color="inherit" 
                size="small" 
                onClick={navigateToApiKeyManagement}
              >
                Đến trang quản lý API Keys
              </Button>
            )
          }
        >
          {error}
        </Alert>
      )}
      
      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Cấu hình đã được lưu thành công!
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="provider-label">Provider</InputLabel>
            <Select
              labelId="provider-label"
              value={selectedProvider}
              label="Provider"
              onChange={handleProviderChange}
            >
              {providers.map((provider) => (
                <MenuItem key={provider.value} value={provider.value}>
                  {provider.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth disabled={!selectedProvider}>
            <InputLabel id="api-key-label">API Key</InputLabel>
            <Select
              labelId="api-key-label"
              value={selectedApiKeyId || ''}
              label="API Key"
              onChange={handleApiKeyChange}
              error={Boolean(selectedProvider && filteredKeys.length === 0)}
            >
              {filteredKeys.length > 0 ? (
                filteredKeys.map((key) => (
                  <MenuItem key={key.id} value={key.id}>
                    {key.name} - {key.description || 'No description'}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value="">
                  <em>Không có API key cho provider {selectedProvider}. Vui lòng thêm API key trong tab quản lý.</em>
                </MenuItem>
              )}
            </Select>
            {selectedProvider && filteredKeys.length === 0 && (
              <Box sx={{ mt: 1 }}>
                <FormHelperText error>
                  Không có API key đang hoạt động nào cho provider này. Hãy thêm API key trong tab quản lý API keys.
                </FormHelperText>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={navigateToApiKeyManagement}
                  sx={{ mt: 1 }}
                >
                  Đến trang quản lý API Keys
                </Button>
              </Box>
            )}
          </FormControl>
          
          {selectedApiKeyId && (
            <Box component="div" sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Thông tin API Key:
              </Typography>
              {(() => {
                const selectedKey = apiKeys.find(k => k.id === selectedApiKeyId);
                if (!selectedKey) return null;
                
                return (
                  <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Tên:</strong> {selectedKey.name}
                    </Typography>
                    {selectedKey.description && (
                      <Typography variant="body2">
                        <strong>Mô tả:</strong> {selectedKey.description}
                      </Typography>
                    )}
                    <Box component="div" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip 
                        size="small" 
                        color={selectedKey.is_active ? "success" : "error"} 
                        label={selectedKey.is_active ? "Active" : "Inactive"} 
                      />
                      {selectedKey.tags && selectedKey.tags.map((tag, index) => (
                        <Chip key={index} size="small" label={tag} />
                      ))}
                    </Box>
                  </Box>
                );
              })()}
            </Box>
          )}
          
          <Box component="div" sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={saveConfig}
              disabled={!selectedApiKeyId}
            >
              Lưu cấu hình
            </Button>
            <Button 
              variant="outlined"
              onClick={testApiKey}
              disabled={!selectedApiKeyId}
            >
              Kiểm tra kết nối
            </Button>
            <Button 
              variant="outlined"
              color="secondary"
              onClick={forceReload}
            >
              Làm mới trang
            </Button>
          </Box>
          
          {activeConfig && (
            <Box component="div" sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Cấu hình hoạt động hiện tại:
              </Typography>
              <Typography variant="body2">
                Provider: <strong>{providers.find(p => p.value === activeConfig.provider)?.label || activeConfig.provider}</strong>
              </Typography>
              <Typography variant="body2">
                API Key: <strong>{apiKeys.find(k => k.id === activeConfig.apiKeyId)?.name || 'Unknown'}</strong>
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
} 