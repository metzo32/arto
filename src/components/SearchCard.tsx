interface SearchCardProps {
  imageMain: string;
  imageSub: string;
  desMain: string;
  desSub: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
  imageMain,
  imageSub,
  desMain,
  desSub,
}) => {
  return (
    <div className="top-container">
      <div className="sub-container extra-margin">
        <div className="mid-container left">
          <img src={imageMain} alt="img" className="search-square" />
        </div>
        <div className="mid-container right">
          <img src={imageSub} alt="img" className="search-square" />
          <div className="item-box">
            <p className="search-top-des-main">{desMain}</p>
            <p className="search-top-des-sub">{desSub}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
