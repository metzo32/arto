import ArtistData from "../assets/datas/artitstData";

const SearchProfiles = () => {
  const limitedData = ArtistData.slice(50, 60);

  return (
    <>
      {limitedData.map((artist) => (
        <div className="circle-profile-box">
          <img
            key={artist.id}
            src={artist.mainImage}
            alt={artist.nickname}
            className="search-circle-profile"
          />
          <p>{artist.nickname}</p>
        </div>
      ))}
    </>
  );
};

export default SearchProfiles;
