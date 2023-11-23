import React, { useState, useEffect } from "react";
import { getAllQuotes } from "../services/quoteService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";


const QuoteList = () => {
  const [quotes, setQuotes] = useState([]); // Initialize quotes as an empty array
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getAllQuotes();
        if (data && data.$values) {
          // Extract the $values array and use it for rendering
          setQuotes(data.$values);
        } else {
          console.log("Unexpected quotes data format:", data);
        }
        console.log("Fetched Quotes:", data); // Add this line
        //setQuotes(data);
      } catch (error) {
        setError("Failed to fetch quotes");
      }
    };

    fetchQuotes();
  }, []);


  return (

    
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginRight: "80px",
        marginLeft: "80px",
        padding: "30px",
        marginTop: "20px",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Quote</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Check if quotes is defined and has elements */}
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <TableRow
                  key={quote.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {quote.text}
                  </TableCell>
                  <TableCell align="right">{quote.author}</TableCell>
                  <TableCell align="right">
                    {Array.isArray(quote.tags) ? (
                      //quote.tags.map((tag, index) => (
                      quote.tags.map((tag) => (
                        <span key={tag.id}>
                          {tag.name}{quote.tags.indexOf(tag) < quote.tags.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span>No tags</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No quotes available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QuoteList;

