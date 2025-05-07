import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Pagination,
  Tabs,
  Tab,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ChatbotService } from './ChatbotService';
import { ChatbotMessage } from '@/types/chatbot';
import ApiUsageStats from './ApiUsageStats';
import ApiKeysManager from './ApiKeysManager';
import ChatbotApiKeySelector from './ChatbotApiKeySelector';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`chatbot-tabpanel-${index}`}
      aria-labelledby={`chatbot-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ChatbotManagement() {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openJsonDialog, setOpenJsonDialog] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ChatbotMessage | null>(null);
  const [formData, setFormData] = useState<Partial<ChatbotMessage>>({
    question: '',
    answer: '',
  });
  const limit = 10;
  const isInitialMount = useRef(true);
  const [currentTab, setCurrentTab] = useState(0);

  const fetchMessages = async () => {
    try {
      const { data, count } = await ChatbotService.getChatbotMessages(page, limit, searchTerm);
      setMessages(data);
      setTotalCount(count);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchMessages();
    } else {
      const timer = setTimeout(() => {
        fetchMessages();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [page, searchTerm]);

  const handleOpenDialog = (message?: ChatbotMessage) => {
    if (message) {
      setSelectedMessage(message);
      setFormData(message);
    } else {
      setSelectedMessage(null);
      setFormData({
        question: '',
        answer: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMessage(null);
    setFormData({});
  };

  const handleOpenJsonDialog = () => {
    setOpenJsonDialog(true);
    setJsonInput('');
  };

  const handleCloseJsonDialog = () => {
    setOpenJsonDialog(false);
    setJsonInput('');
  };

  const handleJsonImport = async () => {
    try {
      if (!jsonInput.trim()) {
        alert('Vui lòng nhập dữ liệu JSON');
        return;
      }

      console.log('Parsing JSON input:', jsonInput);
      const jsonData = JSON.parse(jsonInput);
      console.log('Parsed JSON data:', jsonData);
      
      if (!Array.isArray(jsonData)) {
        throw new Error('Dữ liệu JSON phải là một mảng các câu hỏi và câu trả lời');
      }

      if (jsonData.length === 0) {
        throw new Error('Mảng dữ liệu không được rỗng');
      }

      const validData = jsonData.every(item => 
        item && 
        typeof item === 'object' && 
        typeof item.question === 'string' && 
        item.question.trim() !== '' &&
        typeof item.answer === 'string' &&
        item.answer.trim() !== ''
      );

      if (!validData) {
        throw new Error('Mỗi phần tử trong mảng phải có question và answer là chuỗi không rỗng');
      }

      console.log('Starting import of', jsonData.length, 'items');
      
      // Import từng câu hỏi
      let successCount = 0;
      for (const item of jsonData) {
        try {
          await ChatbotService.createChatbotMessage({
            question: item.question.trim(),
            answer: item.answer.trim()
          });
          successCount++;
          console.log('Imported item:', item);
        } catch (error) {
          console.error('Error importing item:', item, error);
        }
      }

      if (successCount === 0) {
        throw new Error('Không có câu hỏi nào được import thành công');
      }

      handleCloseJsonDialog();
      await fetchMessages();
      alert(`Đã import thành công ${successCount}/${jsonData.length} câu hỏi`);
    } catch (error) {
      console.error('Error importing JSON:', error);
      alert('Lỗi khi nhập JSON: ' + (error instanceof Error ? error.message : 'Định dạng không hợp lệ'));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.question || !formData.answer) {
        alert('Vui lòng điền đầy đủ thông tin câu hỏi và câu trả lời');
        return;
      }

      if (selectedMessage) {
        await ChatbotService.updateChatbotMessage(selectedMessage.id, formData);
      } else {
        await ChatbotService.createChatbotMessage(formData as Omit<ChatbotMessage, 'id' | 'created_at' | 'updated_at'>);
      }
      handleCloseDialog();
      fetchMessages();
    } catch (error) {
      console.error('Error saving message:', error);
      alert('Có lỗi xảy ra khi lưu tin nhắn');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) {
      try {
        await ChatbotService.deleteChatbotMessage(id);
        fetchMessages();
        alert('Xóa tin nhắn thành công');
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Có lỗi xảy ra khi xóa tin nhắn');
      }
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          aria-label="chatbot management tabs"
        >
          <Tab label="Quản lý Q&A" />
          <Tab label="Thống kê API" />
          <Tab label="Quản lý API Keys" />
        </Tabs>
      </Box>

      <TabPanel value={currentTab} index={0}>
        <ChatbotApiKeySelector />
        
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Câu hỏi ChatBot</Typography>
          <Box>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleOpenJsonDialog}
              sx={{ mr: 2 }}
            >
              Nhập từ JSON
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleOpenDialog()}
            >
              Thêm tin nhắn mới
            </Button>
          </Box>
        </Box>

        <TextField
          fullWidth
          label="Tìm kiếm"
          variant="outlined"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Câu hỏi</TableCell>
                <TableCell>Câu trả lời</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.question}</TableCell>
                  <TableCell>{message.answer}</TableCell>
                  <TableCell>{new Date(message.created_at).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(message)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(message.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(totalCount / limit)}
            page={page}
            onChange={(_: React.ChangeEvent<unknown>, value: number) => setPage(value)}
          />
        </Box>

        {/* Dialog thêm/sửa câu hỏi */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedMessage ? 'Chỉnh sửa tin nhắn' : 'Thêm tin nhắn mới'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Câu hỏi"
              value={formData.question || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, question: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Câu trả lời"
              value={formData.answer || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, answer: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedMessage ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog nhập JSON */}
        <Dialog open={openJsonDialog} onClose={handleCloseJsonDialog} maxWidth="md" fullWidth>
          <DialogTitle>Nhập câu hỏi từ JSON</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Định dạng JSON yêu cầu:
            </Typography>
            <Box sx={{ 
              background: '#f5f5f5', 
              p: 2, 
              borderRadius: 1,
              mb: 2,
              fontFamily: 'monospace'
            }}>
{`[
  {
    "question": "Câu hỏi 1",
    "answer": "Câu trả lời 1"
  },
  {
    "question": "Câu hỏi 2",
    "answer": "Câu trả lời 2"
  }
]`}
            </Box>
            <TextField
              fullWidth
              label="Dữ liệu JSON"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              multiline
              rows={10}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseJsonDialog}>Hủy</Button>
            <Button onClick={handleJsonImport} variant="contained" color="primary">
              Nhập
            </Button>
          </DialogActions>
        </Dialog>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <ApiUsageStats />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <ApiKeysManager />
      </TabPanel>
    </Box>
  );
} 