import { ArtistDataProps } from "../assets/datas/artitstData";
import { PopUpBelow } from "../components/FramerMotions/scrollMotions";
import ArtistProfileComp from "../components/ArtistProfile.page.components/ArtistProfileComp";
import StartFromTop from "../components/StartFromTop";

interface ArtistDetailPageProps {
  artist: ArtistDataProps;
}

const ArtistProfile = ({ artist }: ArtistDetailPageProps) => {
  return (
    <>
      <StartFromTop />
      <ArtistProfileComp artist={artist} />
    </>
  );
};

export default ArtistProfile;
