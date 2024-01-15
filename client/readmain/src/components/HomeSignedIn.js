import React from "react";
import booksImage from "../assets/bookspage.jpg";
import authorsImage from "../assets/authorspage.jpg";
import editProfileImage from "../assets/editprofilepage.jpg";
import tagsImage from "../assets/tagspage.jpg";

export default function HomeSignedIn() {
  const images = [
    {
      src: booksImage,
      alt: "Books",
      shortText: "View Books",
      longText: "Check out the books we have.",
      link: "/viewbooks",
    },
    {
      src: authorsImage,
      alt: "Authors",
      shortText: "Authors",
      longText: "Check out our list of authors.",
      link: "/authors",
    },
    {
      src: editProfileImage,
      alt: "Edit Profile",
      shortText: "Edit Profile",
      longText: "Edit your personal details.",
      link: "/myprofile",
    },
    {
      src: tagsImage,
      alt: "Tags",
      shortText: "Tags",
      longText: "Browse books by tags.",
      link: "/tags",
    },
  ];

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={(e) => {
              window.location = `http://localhost:3000${image.link}`;
            }}
            className="relative overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:transform hover:scale-105 hover:cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>
            <img
              src={image.src}
              className="h-[250px] w-[350px] object-cover transition-all duration-300 hover:filter hover:brightness-110"
              alt={image.alt}
            />
            <div className="w-full h-full mt-2 absolute top-1/2 left-1/2 text-white text-lg font-bold transform -translate-x-1/2 -translate-y-1/2 ">
              <p className="text-center">{image.shortText}</p>
            </div>

            <p className="text-center w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold opacity-0 transition-all duration-300 hover:opacity-100 hover:translate-y-0">
              {image.longText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
