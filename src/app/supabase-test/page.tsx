'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/context/SupabaseContext';

interface Table {
  name: string;
  schema: string;
}

type TableRow = Record<string, string | number | boolean | null | Record<string, unknown>>;

export default function SupabaseTest() {
  const supabase = useSupabase();
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Đang kiểm tra kết nối...');
  const [configInfo, setConfigInfo] = useState<string | null>(null);
  const [apiKeyInfo, setApiKeyInfo] = useState<string | null>(null);

  // Hiển thị thông tin cấu hình để gỡ lỗi
  useEffect(() => {
    // Hiển thị phần đầu của URL Supabase để xác nhận cấu hình
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (supabaseUrl) {
      setConfigInfo(`URL Supabase: ${supabaseUrl}`);
    } else {
      setConfigInfo('NEXT_PUBLIC_SUPABASE_URL chưa được cấu hình');
    }
    
    if (supabaseKey) {
      // Hiển thị 10 ký tự đầu và 5 ký tự cuối của API key
      const keyLength = supabaseKey.length;
      if (keyLength > 15) {
        const maskedKey = supabaseKey.substring(0, 10) + '...' + supabaseKey.substring(keyLength - 5);
        setApiKeyInfo(`API Key: ${maskedKey} (${keyLength} ký tự)`);
      } else {
        setApiKeyInfo(`API Key: [quá ngắn] (${keyLength} ký tự)`);
      }
    } else {
      setApiKeyInfo('NEXT_PUBLIC_SUPABASE_ANON_KEY chưa được cấu hình');
    }
  }, []);

  // Kiểm tra kết nối và lấy danh sách bảng
  useEffect(() => {
    async function checkConnection() {
      try {
        setLoading(true);
        setError(null);

        // Kiểm tra kết nối với Supabase với phương thức cơ bản nhất
        try {
          const { data: versionData, error: versionError } = await supabase.rpc('pg_version');
          
          if (!versionError) {
            setConnectionStatus(`Đã kết nối thành công với Supabase (PostgreSQL ${versionData || 'unknown version'})`);
            fetchAllTables();
          } else {
            // Thử cách khác
            const { error: authError } = await supabase.auth.getSession();
            
            if (!authError) {
              setConnectionStatus('Đã kết nối thành công với Supabase Auth');
              fetchAllTables();
            } else {
              throw authError;
            }
          }
        } catch (connErr) {
          console.log('Lỗi kết nối chi tiết:', connErr);
          setConnectionStatus('Không thể kết nối đến Supabase');
          throw connErr;
        }
      } catch (err) {
        console.error('Lỗi khi kiểm tra kết nối:', err);
        
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Không thể kết nối với Supabase');
        }
      } finally {
        setLoading(false);
      }
    }

    checkConnection();
  }, [supabase]);

  // Lấy danh sách tất cả các bảng
  const fetchAllTables = async () => {
    try {
      setLoading(true);
      
      // Liệt kê các schema thông dụng
      const allTables: Table[] = [];
      
      // Sử dụng API để lấy thông tin bảng trong các schema
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);
      
      if (response.ok) {
        const definitions = await response.json();
        
        // Lấy danh sách bảng từ định nghĩa API
        Object.keys(definitions.definitions).forEach(tablePath => {
          // Bỏ qua các bảng ảo và views
          if (!tablePath.includes('rpc') && !tablePath.includes('view')) {
            const parts = tablePath.split('/');
            const tableName = parts[parts.length - 1];
            allTables.push({ name: tableName, schema: 'public' });
          }
        });
        
        setTables(allTables);
        console.log('Đã tìm thấy các bảng:', allTables);
        
        if (allTables.length > 0) {
          setSelectedTable(allTables[0].name);
          fetchTableData(allTables[0].name);
        }
      } else {
        // Nếu không lấy được từ API, thử liệt kê một số bảng chuẩn của Supabase
        const standardTables = [
          { name: 'users', schema: 'auth' },
          { name: 'sessions', schema: 'auth' },
          { name: 'identities', schema: 'auth' },
          { name: 'buckets', schema: 'storage' },
          { name: 'objects', schema: 'storage' },
          { name: 'migrations', schema: 'public' },
        ];
        
        setTables(standardTables);
        console.log('Sử dụng danh sách bảng mặc định');
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bảng:', error);
      
      // Mặc định một số bảng để hiển thị
      const fallbackTables = [
        { name: 'users', schema: 'auth' },
        { name: 'sessions', schema: 'auth' },
        { name: 'buckets', schema: 'storage' },
      ];
      
      setTables(fallbackTables);
    } finally {
      setLoading(false);
    }
  };

  // Lấy dữ liệu từ bảng khi chọn bảng
  const fetchTableData = async (tableName: string) => {
    if (!tableName) return;

    try {
      setLoading(true);
      setError(null);
      setSelectedTable(tableName);

      // Phân tích tên bảng nếu có schema
      let table = tableName;
      let schema = 'public';
      
      if (tableName.includes('.')) {
        const parts = tableName.split('.');
        schema = parts[0];
        table = parts[1];
      }

      if (schema === 'auth') {
        // Bảng auth phải truy vấn qua RPC
        const { data, error } = await supabase.rpc('get_auth_' + table, { limit_rows: 10 });
        if (error) throw error;
        setTableData(data || []);
      } else {
        // Bảng thông thường
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(10);

        if (error) throw error;
        setTableData(data || []);
      }
    } catch (err) {
      console.error(`Lỗi khi lấy dữ liệu từ bảng ${tableName}:`, err);
      setError(err instanceof Error ? err.message : `Không thể lấy dữ liệu từ bảng ${tableName}`);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  // Kiểm tra kết nối trực tiếp
  const testConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://bvtupcwaounomfhtryxm.supabase.co/rest/v1/profiles?select=*&limit=1', {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
        },
      });
      
      const data = await response.json();
      console.log('Kết quả test:', response.status, data);
      
      if (response.ok) {
        setConnectionStatus(`Test thành công! Status: ${response.status}`);
      } else {
        setConnectionStatus(`Test thất bại! Status: ${response.status}`);
        setError(JSON.stringify(data));
      }
    } catch (err) {
      console.error('Lỗi test kết nối:', err);
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  // Tìm kiếm tất cả bảng liên quan đến hero/anh hùng
  const findHeroTables = async () => {
    try {
      setLoading(true);
      setError(null);
      setConnectionStatus('Đang tìm kiếm dữ liệu về anh hùng...');
      
      // Danh sách các từ khóa có thể liên quan đến hero (bao gồm cả tiếng Việt)
      const heroKeywords = [
        'hero', 'heroes', 'character', 'champion', 'overwatch',
        'anh_hung', 'nhan_vat', 'anh', 'hung', 'vai_tro', 'ky_nang',
        'do_hi_em', 'thuong_chip', 'chi_so_level', 'nang_sao', 'tien_hoa'
      ];
      const heroTables: Table[] = [];
      
      // Kiểm tra tên bảng chứa các từ khóa liên quan đến hero
      for (const table of tables) {
        const tableName = table.name.toLowerCase();
        if (heroKeywords.some(keyword => tableName.includes(keyword))) {
          heroTables.push(table);
        }
      }
      
      // Nếu không tìm thấy bảng nào theo tên, truy vấn mẫu một số bảng để tìm cột liên quan đến hero
      if (heroTables.length === 0) {
        // Danh sách một số bảng phổ biến để kiểm tra
        const tablesToCheck = tables.filter(t => t.schema === 'public').slice(0, 10);
        
        for (const table of tablesToCheck) {
          try {
            const { data, error } = await supabase
              .from(table.name)
              .select('*')
              .limit(1);
              
            if (!error && data && data.length > 0) {
              // Kiểm tra xem bảng có cột nào liên quan đến hero không
              const columns = Object.keys(data[0]).map(col => col.toLowerCase());
              if (columns.some(col => 
                heroKeywords.some(keyword => col.includes(keyword)) || 
                col.includes('ten') || 
                col.includes('vai_tro') || 
                col.includes('dac_diem')
              )) {
                heroTables.push(table);
              }
            }
          } catch (err) {
            console.log(`Không thể kiểm tra bảng ${table.name}:`, err);
          }
        }
      }
      
      // Hiển thị kết quả chi tiết về anh hùng
      if (heroTables.length > 0) {
        // Đã tìm thấy bảng liên quan, hiển thị và phân tích
        setTables(heroTables);
        setConnectionStatus(`Đã tìm thấy ${heroTables.length} bảng liên quan đến anh hùng`);
        
        // Tự động phân tích mối quan hệ và hiển thị dữ liệu
        if (heroTables.some(t => t.name === 'anh_hung')) {
          setSelectedTable('anh_hung');
          fetchTableData('anh_hung');
          
          // Hiển thị thông tin về phân tích dữ liệu anh hùng
          setError(`Phân tích dữ liệu anh hùng:
          
- Bảng anh_hung: Chứa thông tin cơ bản về các nhân vật trong game
- Bảng vai_tro: Phân loại vai trò của anh hùng (Gunner, Sniper, Rocket)
- Bảng do_hi_em: Phân loại độ hiếm của anh hùng (Common, Rare, Epic, Legendary)
- Bảng thuong_chip: Thông tin về phần thưởng chip theo độ hiếm và số sao
- Bảng chi_so_level: Chỉ số nhân vật theo level
- Bảng nang_sao: Thông tin về nâng sao cho nhân vật
- Bảng tien_hoa: Thông tin về tiến hóa giữa các độ hiếm

Vui lòng kiểm tra các bảng này để xem dữ liệu chi tiết.`);
        } else {
          // Nếu không tìm thấy bảng anh_hung, hiển thị bảng đầu tiên
          setSelectedTable(heroTables[0].name);
          fetchTableData(heroTables[0].name);
        }
      } else {
        setConnectionStatus('Không tìm thấy bảng nào liên quan đến anh hùng');
        setError(`Không tìm thấy bảng nào chứa dữ liệu về anh hùng. 

Theo file SQL mẫu, hệ thống nên có các bảng sau:
- anh_hung (thông tin anh hùng)
- vai_tro (vai trò của anh hùng)
- do_hi_em (độ hiếm)
- thuong_chip (thưởng chip)
- chi_so_level (chỉ số theo cấp độ)
- nang_sao (thông tin nâng sao)
- tien_hoa (thông tin tiến hóa)

Vui lòng kiểm tra lại cơ sở dữ liệu hoặc thực hiện import dữ liệu SQL mẫu vào Supabase.`);
      }
    } catch (err) {
      console.error('Lỗi khi tìm kiếm bảng hero:', err);
      setError(err instanceof Error ? err.message : 'Lỗi không xác định khi tìm kiếm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Kiểm Tra Kết Nối Supabase</h1>
        
        <div className="mb-6 p-4 bg-gray-800/50 border border-gray-600/50 rounded-lg">
          {configInfo && <p className="text-white/70 mb-2">{configInfo}</p>}
          {apiKeyInfo && <p className="text-white/70">{apiKeyInfo}</p>}
          <p className="text-sm text-white/50 mt-2">
            Kiểm tra file .env.local để đảm bảo đã cấu hình đúng NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY
          </p>
        </div>
        
        <div className={`mb-6 p-4 rounded-lg text-white border ${
          connectionStatus.includes('thành công') 
            ? 'bg-green-900/30 border-green-500/50' 
            : connectionStatus.includes('Lỗi') || connectionStatus.includes('không')
              ? 'bg-red-900/30 border-red-500/50'
              : 'bg-yellow-900/30 border-yellow-500/50'
        }`}>
          <div className="flex items-center mb-2">
            {connectionStatus.includes('thành công') ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : connectionStatus.includes('Lỗi') || connectionStatus.includes('không') ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{connectionStatus}</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={testConnection}
              disabled={loading}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-xs"
            >
              Test kết nối REST API
            </button>
            <button 
              onClick={fetchAllTables}
              disabled={loading}
              className="px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 text-xs"
            >
              Làm mới danh sách bảng
            </button>
            <button 
              onClick={findHeroTables}
              disabled={loading}
              className="px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 text-xs"
            >
              Tìm bảng anh hùng
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 whitespace-pre-line">
            <p className="font-semibold mb-1">Lỗi:</p>
            <p className="font-mono text-sm">{error}</p>
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Danh Sách Bảng</h2>
          </div>
          
          {loading && !selectedTable && (
            <div className="flex items-center space-x-2 text-[var(--overwatch-blue)]">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang tải danh sách bảng...</span>
            </div>
          )}
          
          {tables.length === 0 && !loading && (
            <div className="text-white/70 p-6 bg-white/5 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="mb-3">Không tìm thấy bảng nào trong cơ sở dữ liệu.</p>
              <p className="text-sm text-white/50">Hãy kiểm tra lại kết nối Supabase và quyền truy cập của người dùng.</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map((table) => (
              <button
                key={`${table.schema}.${table.name}`}
                onClick={() => fetchTableData(table.name)}
                className={`p-3 rounded-lg border text-left hover:border-[var(--overwatch-blue)] transition-colors ${
                  selectedTable === table.name 
                    ? 'bg-[var(--overwatch-blue)]/20 border-[var(--overwatch-blue)]' 
                    : 'bg-[#1A2526]/50 border-white/10'
                }`}
              >
                <span className="font-medium">{table.name}</span>
                <span className="text-xs block mt-1 text-white/60">{table.schema}</span>
              </button>
            ))}
          </div>
        </div>
        
        {selectedTable && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Dữ Liệu Bảng: <span className="text-[var(--overwatch-blue)]">{selectedTable}</span>
            </h2>
            
            {loading && (
              <div className="flex items-center space-x-2 mb-4 text-[var(--overwatch-blue)]">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Đang tải dữ liệu...</span>
              </div>
            )}
            
            {tableData.length === 0 && !loading ? (
              <div className="text-white/70 p-4 bg-white/5 rounded-lg">
                Không có dữ liệu trong bảng này.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#1A2526]">
                      {tableData.length > 0 && 
                        Object.keys(tableData[0]).map((column) => (
                          <th 
                            key={column} 
                            className="border border-white/10 px-4 py-2 text-left text-sm font-medium"
                          >
                            {column}
                          </th>
                        ))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex} 
                        className="border-b border-white/10 hover:bg-white/5"
                      >
                        {Object.values(row).map((value, valueIndex) => (
                          <td 
                            key={valueIndex} 
                            className="border border-white/10 px-4 py-2 text-sm"
                          >
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 