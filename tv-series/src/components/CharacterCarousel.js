import { useState, useEffect } from "react";
import { Pagination, Box } from "@mui/material";
import Character from './Character'

const CharacterCarousel = ({ seriesCharacters, itemsPerPage, seriesId }) => {

    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(seriesCharacters.length / itemsPerPage);

    const currentCharacters = seriesCharacters.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box>
        {/* Lista horizontal */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    justifyContent: "left",
                    flexWrap: "nowrap",
                }}
            >
                {currentCharacters.map((character) => (
                    <Character character={character} seriesID={seriesId} key={character.id} />
                ))}
            </Box>

            {/* Paginador */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 2,
                        "& .MuiPaginationItem-root": {
                            color: "white",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            border: "1px solid white",
                            borderRadius: "6px",
                            minWidth: "36px",
                            height: "36px"
                        },
                        "& .Mui-selected": {
                            color: "black",
                            backgroundColor: "white",
                            fontWeight: "bold"
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "rgba(240, 227, 227, 0.68)"
                        },
                    }}
                />
            </Box>
        </Box>
    )
}

export default CharacterCarousel