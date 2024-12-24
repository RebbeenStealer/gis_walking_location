import React, { useState } from 'react';

const Sidebar = ({ onSearch, results, currentPage, totalPages, onPageChange }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query); // 검색어가 비어있지 않으면 onSearch 호출
        }
    };

    return (
        <div style={{ width: '300px', padding: '10px', borderRight: '1px solid #ccc', height: '100vh', overflowY: 'auto' }}>
            <h2>검색</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // 입력값 변경 시 상태 업데이트
                placeholder="검색어를 입력하세요"
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={handleSearch} style={{ width: '100%' }}>검색</button>
            <h3>결과</h3>
            <ul>
                {results.map((place) => (
                    <li key={place.id} onClick={() => place.onClick()} style={{ cursor: 'pointer', marginBottom: '5px' }}>
                        {place.place_name} ({place.distance}m)
                    </li>
                ))}
            </ul>
            
            {/* 페이징 버튼 */}
            <div>
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => onPageChange(currentPage - 1)} 
                    style={{ marginRight: '5px' }}
                >
                    이전
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => onPageChange(currentPage + 1)} 
                    style={{ marginLeft: '5px' }}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
