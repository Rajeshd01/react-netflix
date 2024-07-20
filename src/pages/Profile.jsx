import React, { useEffect, useState } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movieServices";
import { arrayRemove, doc, updateDoc, onSnapshot } from "firebase/firestore";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.email), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);
  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
  };
  if (!user) {
    return (
      <>
        <p>Fetching Shows......</p>
      </>
    );
  }

  return (
    <>
      <div>
        <img
          className="block w-full h-[500px] object-cover"
          src="/src/assets/img/background1.jpg"
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]">
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
              My shows
            </h1>
            <p className="font-nsans-light text-gray-400 text-lg">
              {user.email}
            </p>
          </div>
        </div>

        {/* movie Row */}
        <h2 className="font-nsans-bold md:text-xl p-4 capitalize">Fav Shows</h2>

        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={() => slide(-500)}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
          <div
            id={`slider`}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide scroll"
          >
            {movies.map((movie) => {
              const { backdrop_path, poster_path, title } = movie; // Destructure properties from movie object
              return (
                <div
                  key={movie.id}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
                >
                  <img
                    className="w-full h-40 block object-cover object-top"
                    src={createImageUrl(backdrop_path ?? poster_path, "w500")}
                    alt={title}
                  />

                  <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                    <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                      {title}
                    </p>
                    <p>
                      <AiOutlineClose
                        size={30}
                        className="absolute top-2 right-2"
                        onClick={() => handleUnlikeShow(movie)}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
