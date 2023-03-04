import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { fetchUsers } from "../../features/userSlice";

const Cardlist = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [moviesType, setMoviesType] = useState([]);
  const [typeSelected, setTypeSelected] = useState("All movies types");
  const [myMovies, setMyMovies] = useState([]);
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (movies.users.length > 0) {
      let tab = [];
      movies.users.forEach((movie) => {
        tab.push(movie.category);
      });
      tab = [...new Set(tab)];
      setMoviesType(tab);
    }
    filterMovies();
  }, [movies]);

  useEffect(() => {
    filterMovies(true);
  }, [typeSelected]);

  const filterMovies = (setnumber) => {
    if (typeSelected != "All movies types") {
      let tab = movies.users?.filter(
        (movie) => movie?.category == typeSelected
      );
      setMyMovies(tab);
      if (setnumber) {
        setPageNumber(0);
      }
    } else {
      setMyMovies(movies.users);
      if (setnumber) {
        setPageNumber(0);
      }
    }
  };

  const usersPerPage = 3;

  const pageVisited = pageNumber * usersPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const Cardcomponent = myMovies
    .slice(pageVisited, pageVisited + usersPerPage)
    .map((user, index) => {
      return (
        <Card
          key={index}
          id={user.id}
          likes={user.likes}
          dislikes={user.dislikes}
          likeActive={user.likeActive}
          dislikeActive={user.dislikeActive}
          title={user.title}
          category={user.category}
        />
      );
    });

  const pageCount = Math.ceil(myMovies.length / usersPerPage);

  return (
    <>
      <div className="tc mt3 mb4">
        <select
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "6px",
            width: "180px",
            textAlign: "center",
          }}
          name="moviesType"
          id="moviesType"
          onChange={(e) => {
            setTypeSelected(e.target.value);
          }}
        >
          <option>All movies types</option>
          {moviesType?.map((type) => {
            return <option>{type}</option>;
          })}
        </select>
      </div>
      <div className="tc">
        {Cardcomponent};
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
};

export default Cardlist;
