import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Button
} from '@mui/material';
import { ChatbotService } from './ChatbotService';
import { ApiUsageStats as ApiUsageStatsType, ApiUsageLog } from '@/types/chatbot';
import { supabase } from '@/tien_ich/supabase';

export default function ApiUsageStats() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [stats, setStats] = useState<ApiUsageStatsType | null>(null);
  const [recentCalls, setRecentCalls] = useState<ApiUsageLog[]>([]);
  const [startDate, setStartDate] = useState(formatDate(thirtyDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkSupabaseConnection = async () => {
    try {
      console.log('Checking Supabase connection...');
      
      const { error } = await supabase
        .from('api_usage_logs')
        .select('*', { head: true })
        .limit(1);
      
      if (error) {
        console.error('Supabase connection error:', error);
        return false;
      }
      
      console.log('Supabase connection successful, table exists');
      return true;
    } catch (err) {
      console.error('Failed to check Supabase connection:', err);
      return false;
    }
  };

  const loadStats = async () => {
    try {
      console.log('Loading API usage stats...');
      console.log('Date range:', { startDate, endDate });
      
      setLoading(true);
      setError(null);
      
      const connectionOk = await checkSupabaseConnection();
      if (!connectionOk) {
        setError('Không thể kết nối với Supabase. Vui lòng kiểm tra cấu hình và quyền truy cập.');
        setLoading(false);
        return;
      }
      
      const [statsData, recentCallsData] = await Promise.all([
        ChatbotService.getApiUsageStats(startDate, endDate),
        ChatbotService.getRecentApiCalls(10)
      ]);
      
      console.log('Received stats data:', statsData);
      console.log('Received recent calls:', recentCallsData);

      setStats(statsData);
      setRecentCalls(recentCallsData);
    } catch (err) {
      console.error('Error loading stats:', err);
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [startDate, endDate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography>Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, color: 'error.main' }}>
        <Typography>Lỗi: {error}</Typography>
        <Button onClick={loadStats} sx={{ mt: 2 }}>Thử lại</Button>
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thống kê sử dụng API
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, mb: 3 }}>
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
            <TextField
              type="date"
              label="Từ ngày"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
            <TextField
              type="date"
              label="Đến ngày"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, mb: 4 }}>
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tổng số lần gọi API
                </Typography>
                <Typography variant="h4">
                  {stats?.total_calls.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tổng tokens sử dụng
                </Typography>
                <Typography variant="h4">
                  {stats?.total_tokens.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tổng chi phí (USD)
                </Typography>
                <Typography variant="h4">
                  ${stats?.total_cost.toFixed(4)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tỷ lệ thành công
                </Typography>
                <Typography variant="h4">
                  {stats?.success_rate.toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Lịch sử gọi API gần đây
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thời gian</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Tokens</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Chi phí (USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    {new Date(call.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {call.message_content}
                  </TableCell>
                  <TableCell>
                    {call.tokens_used.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        color: call.status === 'success' ? 'success.main' : 'error.main'
                      }}
                    >
                      {call.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    ${call.cost.toFixed(4)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
} 