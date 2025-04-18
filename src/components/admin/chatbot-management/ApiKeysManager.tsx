import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Chip,
  Tabs,
  Tab,
  Divider,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, ContentCopy as CopyIcon } from '@mui/icons-material';
import { ApiKey, ApiKeyConfig } from '@/types/chatbot';
import { ApiKeyService } from './ApiKeyService';

export default function ApiKeysManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [config, setConfig] = useState<ApiKeyConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [formData, setFormData] = useState<Partial<ApiKey>>({
    key: '',
    provider: 'deepseek',
    name: '',
    description: '',
    is_active: true,
    priority: 0,
    tags: []
  });

  // Confirmation dialog for delete
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<number | null>(null);

  // Load data
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [keysData, configData] = await Promise.all([
        ApiKeyService.getApiKeys(),
        ApiKeyService.getApiKeyConfig()
      ]);

      setApiKeys(keysData);
      setConfig(configData);
    } catch (err) {
      console.error('Error loading API keys data:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter keys by provider
  const filteredKeys = selectedProvider === 'all'
    ? apiKeys
    : apiKeys.filter(key => key.provider === selectedProvider);

  // Handle dialog open for add/edit
  const handleOpenDialog = (mode: 'add' | 'edit', key?: ApiKey) => {
    setDialogMode(mode);
    if (mode === 'edit' && key) {
      setSelectedKey(key);
      setFormData({
        key: key.key,
        provider: key.provider,
        name: key.name,
        description: key.description || '',
        is_active: key.is_active,
        priority: key.priority,
        tags: key.tags || []
      });
    } else {
      setSelectedKey(null);
      setFormData({
        key: '',
        provider: 'deepseek',
        name: '',
        description: '',
        is_active: true,
        priority: 0,
        tags: []
      });
    }
    setOpenDialog(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle Select changes separately
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle checkbox changes
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle submit form
  const handleSubmit = async () => {
    try {
      // Kiểm tra dữ liệu trước khi gửi
      if (!formData.name || !formData.key || !formData.provider) {
        setError('Vui lòng điền đầy đủ thông tin: Tên, API Key và Provider');
        return;
      }

      console.log('Submitting form data:', formData);
      setLoading(true);
      
      if (dialogMode === 'add') {
        console.log('Creating new API key...');
        const newKey = await ApiKeyService.createApiKey(formData as Omit<ApiKey, 'id' | 'created_at' | 'updated_at' | 'usage_count'>);
        console.log('API key created successfully:', newKey);
      } else if (dialogMode === 'edit' && selectedKey) {
        console.log('Updating API key:', selectedKey.id);
        const updatedKey = await ApiKeyService.updateApiKey(selectedKey.id, formData);
        console.log('API key updated successfully:', updatedKey);
      }
      
      setOpenDialog(false);
      await loadData();
    } catch (err) {
      console.error('Error saving API key:', err);
      // Hiển thị thông báo lỗi cụ thể hơn
      if (err instanceof Error) {
        setError(`Lỗi khi lưu API key: ${err.message}`);
      } else {
        setError('Có lỗi xảy ra khi lưu API key. Vui lòng kiểm tra console để biết thêm chi tiết.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (keyToDelete !== null) {
      try {
        setLoading(true);
        await ApiKeyService.deleteApiKey(keyToDelete);
        setDeleteConfirmOpen(false);
        setKeyToDelete(null);
        await loadData();
      } catch (err) {
        console.error('Error deleting API key:', err);
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa API key');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      setLoading(true);
      await ApiKeyService.toggleApiKeyStatus(id, !currentStatus);
      await loadData();
    } catch (err) {
      console.error('Error toggling API key status:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi thay đổi trạng thái API key');
    } finally {
      setLoading(false);
    }
  };

  // Handle config save
  const handleSaveConfig = async () => {
    if (!config) return;
    
    try {
      setLoading(true);
      await ApiKeyService.updateApiKeyConfig(config);
      await loadData();
    } catch (err) {
      console.error('Error saving config:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi lưu cấu hình');
    } finally {
      setLoading(false);
    }
  };

  // Handle config changes
  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name && config) {
      setConfig({
        ...config,
        [name]: value
      });
    }
  };

  // Handle config Select changes separately
  const handleConfigSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name && config) {
      setConfig({
        ...config,
        [name]: value
      });
    }
  };

  // Handle config switch changes
  const handleConfigSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (config) {
      setConfig({
        ...config,
        [name]: checked
      });
    }
  };

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Handle copy API key to clipboard
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // Thông báo đã copy có thể thêm vào đây
  };

  // Render API Keys
  const renderApiKeysTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Nhà cung cấp</InputLabel>
          <Select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as string)}
            label="Nhà cung cấp"
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="deepseek">DeepSeek</MenuItem>
            <MenuItem value="openai">OpenAI</MenuItem>
            <MenuItem value="anthropic">Anthropic</MenuItem>
            <MenuItem value="mistral">Mistral AI</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </Select>
        </FormControl>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpenDialog('add')}
        >
          Thêm API Key
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>API Key</TableCell>
              <TableCell>Nhà cung cấp</TableCell>
              <TableCell>Độ ưu tiên</TableCell>
              <TableCell align="center">Lần sử dụng</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredKeys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Không có API key nào</TableCell>
              </TableRow>
            ) : (
              filteredKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>
                    <Typography variant="body2">{apiKey.name}</Typography>
                    {apiKey.description && (
                      <Typography variant="caption" color="textSecondary">
                        {apiKey.description}
                      </Typography>
                    )}
                    {apiKey.tags && apiKey.tags.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {apiKey.tags.map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            sx={{ mr: 0.5, mb: 0.5 }} 
                          />
                        ))}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ 
                        fontFamily: 'monospace', 
                        maxWidth: 200, 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {apiKey.key.substring(0, 8)}...
                      </Typography>
                      <Tooltip title="Sao chép">
                        <IconButton 
                          size="small" 
                          onClick={() => handleCopyKey(apiKey.key)}
                        >
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={apiKey.provider} 
                      color={
                        apiKey.provider === 'deepseek' ? 'primary' :
                        apiKey.provider === 'openai' ? 'success' :
                        apiKey.provider === 'anthropic' ? 'secondary' :
                        apiKey.provider === 'mistral' ? 'info' : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">{apiKey.priority}</TableCell>
                  <TableCell align="center">{apiKey.usage_count}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={apiKey.is_active}
                      onChange={() => handleToggleStatus(apiKey.id, apiKey.is_active)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Sửa">
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog('edit', apiKey)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => {
                          setKeyToDelete(apiKey.id);
                          setDeleteConfirmOpen(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // Render Settings Tab
  const renderSettingsTab = () => (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Cấu hình API Keys</Typography>
        <Divider sx={{ mb: 3 }} />
        
        {config && (
          <>
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Chiến lược lựa chọn API Key</InputLabel>
                <Select
                  name="selection_strategy"
                  value={config.selection_strategy}
                  label="Chiến lược lựa chọn API Key"
                  onChange={handleConfigSelectChange}
                >
                  <MenuItem value="priority">Độ ưu tiên (Mặc định)</MenuItem>
                  <MenuItem value="round_robin">Luân phiên (Round Robin)</MenuItem>
                  <MenuItem value="least_used">Ít sử dụng nhất</MenuItem>
                  <MenuItem value="random">Ngẫu nhiên</MenuItem>
                </Select>
              </FormControl>
              
              <FormControlLabel
                control={
                  <Switch
                    name="fallback_enabled"
                    checked={config.fallback_enabled}
                    onChange={handleConfigSwitchChange}
                  />
                }
                label="Cho phép sử dụng fallback khi API key lỗi"
                sx={{ mb: 2, display: 'block' }}
              />
              
              {config.fallback_enabled && (
                <TextField
                  name="max_tries_before_fallback"
                  label="Số lần thử trước khi chuyển sang fallback"
                  type="number"
                  value={config.max_tries_before_fallback}
                  onChange={handleConfigChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              
              <FormControlLabel
                control={
                  <Switch
                    name="usage_monitoring_enabled"
                    checked={config.usage_monitoring_enabled}
                    onChange={handleConfigSwitchChange}
                  />
                }
                label="Theo dõi lượng sử dụng API key"
                sx={{ mb: 2, display: 'block' }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    name="auto_rotate_on_limit"
                    checked={config.auto_rotate_on_limit}
                    onChange={handleConfigSwitchChange}
                  />
                }
                label="Tự động chuyển API key khi hết quota"
                sx={{ mb: 2, display: 'block' }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSaveConfig}
                disabled={loading}
              >
                Lưu cấu hình
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );

  // Render dialog form
  const renderDialogForm = () => (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dialogMode === 'add' ? 'Thêm API Key mới' : 'Chỉnh sửa API Key'}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Nhà cung cấp</InputLabel>
          <Select
            name="provider"
            value={formData.provider || ''}
            onChange={handleSelectChange}
            label="Nhà cung cấp"
            required
          >
            <MenuItem value="deepseek">DeepSeek</MenuItem>
            <MenuItem value="openai">OpenAI</MenuItem>
            <MenuItem value="anthropic">Anthropic</MenuItem>
            <MenuItem value="mistral">Mistral AI</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </Select>
        </FormControl>

        <TextField
          margin="normal"
          name="name"
          label="Tên API Key"
          fullWidth
          value={formData.name || ''}
          onChange={handleInputChange}
          placeholder="Tên để nhận diện API key này"
          required
        />

        <TextField
          margin="normal"
          name="key"
          label="API Key"
          fullWidth
          value={formData.key || ''}
          onChange={handleInputChange}
          placeholder="Nhập API key của bạn tại đây"
          required
        />

        <TextField
          margin="normal"
          name="description"
          label="Mô tả"
          fullWidth
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Mô tả ngắn về API key này"
          multiline
          rows={2}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <TextField
            name="priority"
            label="Độ ưu tiên"
            type="number"
            value={formData.priority || 0}
            onChange={handleInputChange}
            sx={{ width: 150, mr: 2 }}
          />
          
          <FormControlLabel
            control={
              <Switch
                name="is_active"
                checked={formData.is_active || false}
                onChange={handleSwitchChange}
                color="primary"
              />
            }
            label="Kích hoạt"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
        >
          {loading ? 'Đang lưu...' : 'Lưu'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Main render
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Quản lý API Keys
      </Typography>
      
      {error && (
        <Box sx={{ p: 2, mb: 2, bgcolor: 'error.light', borderRadius: 1 }}>
          <Typography color="error">{error}</Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            size="small" 
            onClick={loadData}
            sx={{ mt: 1 }}
          >
            Thử lại
          </Button>
        </Box>
      )}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="API Keys" />
         
        </Tabs>
      </Box>
      
      {loading ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography>Đang tải dữ liệu...</Typography>
        </Box>
      ) : (
        <>
          {tabIndex === 0 && renderApiKeysTab()}
          {tabIndex === 1 && renderSettingsTab()}
        </>
      )}
      
      {renderDialogForm()}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa API key này?</Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 