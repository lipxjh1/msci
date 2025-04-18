import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { ApiUsageStats } from '@/types/chatbot';
import { formatCurrency } from '@/tien_ich/format';

// Định nghĩa type chính xác cho màu của provider
type ProviderColorType = 'primary' | 'success' | 'secondary' | 'info' | 'default' | 'error' | 'warning';

// Các màu tương ứng với từng provider
const providerColors: Record<string, ProviderColorType> = {
  deepseek: 'primary',
  openai: 'success',
  anthropic: 'secondary',
  mistral: 'info',
  database: 'default',
  fallback: 'error',
  hardcoded: 'warning',
  unknown: 'default'
};

interface ChatbotStatsByProviderProps {
  stats: ApiUsageStats;
}

const ChatbotStatsByProvider: React.FC<ChatbotStatsByProviderProps> = ({ stats }) => {
  if (!stats.usage_by_provider || stats.usage_by_provider.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1">Không có dữ liệu thống kê theo nhà cung cấp.</Typography>
      </Box>
    );
  }

  // Phân loại provider theo groups
  const groupedProviders = {
    aiModels: ['deepseek', 'openai', 'anthropic', 'mistral'],
    internal: ['database', 'hardcoded', 'fallback'],
    other: ['unknown']
  };

  // Phân loại dữ liệu theo nhóm
  const groupedData = {
    aiModels: stats.usage_by_provider.filter(p => 
      groupedProviders.aiModels.includes(p.provider.toLowerCase())),
    internal: stats.usage_by_provider.filter(p => 
      groupedProviders.internal.includes(p.provider.toLowerCase())),
    other: stats.usage_by_provider.filter(p => 
      !groupedProviders.aiModels.includes(p.provider.toLowerCase()) && 
      !groupedProviders.internal.includes(p.provider.toLowerCase()))
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Thống kê theo nhà cung cấp
      </Typography>

      {/* Thống kê tổng quan */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={2} 
        sx={{ mb: 3 }}
      >
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Tổng số cuộc gọi API
              </Typography>
              <Typography variant="h4" component="div">
                {stats.total_calls.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Tổng số token sử dụng
              </Typography>
              <Typography variant="h4" component="div">
                {stats.total_tokens.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Tổng chi phí
              </Typography>
              <Typography variant="h4" component="div">
                {formatCurrency(stats.total_cost)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Stack>

      {/* Bảng thống kê AI models */}
      {groupedData.aiModels.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            AI Models
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nhà cung cấp</TableCell>
                  <TableCell align="center">Số lượt gọi</TableCell>
                  <TableCell align="center">Số token</TableCell>
                  <TableCell align="center">Chi phí</TableCell>
                  <TableCell align="center">Tỷ lệ thành công</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedData.aiModels.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Chip 
                        label={item.provider} 
                        color={providerColors[item.provider.toLowerCase()] as ProviderColorType || 'default'} 
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{item.calls.toLocaleString()}</TableCell>
                    <TableCell align="center">{item.tokens.toLocaleString()}</TableCell>
                    <TableCell align="center">{formatCurrency(item.cost)}</TableCell>
                    <TableCell align="center">{item.success_rate.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Bảng thống kê Internal sources */}
      {groupedData.internal.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Internal Sources
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nguồn</TableCell>
                  <TableCell align="center">Số lượt gọi</TableCell>
                  <TableCell align="center">Số token</TableCell>
                  <TableCell align="center">Chi phí</TableCell>
                  <TableCell align="center">Tỷ lệ thành công</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedData.internal.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Chip 
                        label={item.provider} 
                        color={providerColors[item.provider.toLowerCase()] as ProviderColorType || 'default'} 
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{item.calls.toLocaleString()}</TableCell>
                    <TableCell align="center">{item.tokens.toLocaleString()}</TableCell>
                    <TableCell align="center">{formatCurrency(item.cost)}</TableCell>
                    <TableCell align="center">{item.success_rate.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Bảng thống kê Other */}
      {groupedData.other.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Khác
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nguồn</TableCell>
                  <TableCell align="center">Số lượt gọi</TableCell>
                  <TableCell align="center">Số token</TableCell>
                  <TableCell align="center">Chi phí</TableCell>
                  <TableCell align="center">Tỷ lệ thành công</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedData.other.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Chip 
                        label={item.provider} 
                        color="default" 
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{item.calls.toLocaleString()}</TableCell>
                    <TableCell align="center">{item.tokens.toLocaleString()}</TableCell>
                    <TableCell align="center">{formatCurrency(item.cost)}</TableCell>
                    <TableCell align="center">{item.success_rate.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default ChatbotStatsByProvider; 