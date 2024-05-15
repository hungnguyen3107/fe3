import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { productServices } from "../../../services/productService";
export const SearchBar = ({ setResults, setIsShowResults }) => {
    const [input, setInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const handleBlur = () => {
        setTimeout(() => {
            setIsShowResults(false);
        }, 1000);
    };
    const fetchData = async () => {
        const res = await productServices.get({
            "Limit": currentPage,
            "PageIndex": rowsPerPage,
            "Name": input
        });
        if (res) {
            setResults(res.items);
        }
    };
    useEffect(() => {
        fetchData();
    }, [input])
    return (
        <div className="input-wrapper">
            {/* <FontAwesomeIcon icon={faSearch} />
            <input
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            /> */}
            <input
                type="text"
                class="form-control"
                name="search"
                autocomplete="off"
                placeholder="Search..."
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsShowResults(true)}
                onBlur={handleBlur}
            />
            <button class="btn btn-search" type="submit" title="submit-button">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};