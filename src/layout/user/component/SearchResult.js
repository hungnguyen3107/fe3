
export const SearchResult = ({ result, setResults }) => {
    const handleClick = () => {
        alert(`You selected ${result}!`);
        setResults([]); // Tắt danh sách kết quả tìm kiếm khi click vào kết quả
    };

    return (
        <div className="search-result" onClick={handleClick}>
            {result}
        </div>
    );
};