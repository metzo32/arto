import {
  Div,
  Img,
  H3,
  H4,
  Links,
} from "../_styles/ArticleComp.style";
import WishList from "../../../components/Wishlist/WishList";
import type { ArtistDataProps } from "../../../../public/assets/datas/artistData";

interface ArtistCardProps {
  artist: ArtistDataProps;
  toggleWishlist: (id: number) => void;
}

export const ArtistCard = ({ artist, toggleWishlist }: ArtistCardProps) => {
  return (
    <Links href={`/detail/${artist.nickname}`} key={artist.id}>
      <Div className="article-cards">
        <Img
          src={artist.mainImage}
          alt={`${artist.nickname}`}
          className="article-random-image"
          width={500}
          height={200}
   
        />
        <Div className="title-container">
          <WishList
            artistId={artist.id}
            isWishlisted={!!artist.isWishlisted}
            onToggleWishlist={() => toggleWishlist(artist.id)}
            artistNickname={artist.nickname}
            artistmainImage={artist.mainImage}
            artistStreet={artist.street_address}
            artistCity={artist.city}
            artistSkills={artist.skills.map((skill) => skill.id)}
          />
          <H3 className="article-name">{artist.nickname}</H3>
        </Div>
      </Div>
    </Links>
  );
};
