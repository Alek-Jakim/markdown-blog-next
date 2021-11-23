import React, {useState, useEffect} from "react"
import {FaSearch} from "react-icons/fa"
import SearchResults from "./SearchResults";

const Search = () => {

    const [searchItem, setSearchItem] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        const getResults = async () => {
            if(searchItem === "") {
                setSearchResults([]);
            } else {
                const res = await fetch(`/api/search?q=${searchItem}`);
                const { results } = await res.json();
                console.log(results);
                setSearchResults(results);
            }
        }

        getResults();
    }, [searchItem])

    return (
        <div className="relative bg-gray-600 p-4">
            <div className="container mx-auto flex items-center justify-center md:justify-end">
                <div className="relative text-gray-600 w-72">
                    <form>
                        <input 
                        type="search" 
                        name="search" 
                        id="search" 
                        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72" 
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        placeholder="Search Posts"
                        />
                        <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4" style={{cursor: "pointer"}} />
                    </form>
                </div>
            </div>
            <SearchResults results={searchResults} />
        </div>
    )
}

export default Search
