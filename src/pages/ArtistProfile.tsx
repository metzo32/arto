import s from "../stores/styling";
import { ArtistDataProps } from "../assets/datas/artitst_data";
import ArtistSkillComponent from "../components/ArtistSkillComponent";
import HoverButton from "../components/HoverButton";
import { PopUpBelow } from "../components/FramerMotions/scrollMotions";

interface ArtistDetailPageProps {
  artist: ArtistDataProps;
}

const ArtistProfile = ({ artist }: ArtistDetailPageProps) => {
  const handleNavigation = () => {};

  const CopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("복사 완료!");
      },
      (err) => {
        console.error("복사 실패", err);
      }
    );
  };

  const handleCopy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const innerText = e.currentTarget.innerText;
    // const innerText = e.target.innerText; --> 이 경우, target 속성에 innerText이 직접적으로 존재하지 않으므로 에러.
    CopyToClipboard(innerText); //복사할 텍스트를 복사
  };

  return (
    <>
      <s.Portfolio className="portfolio-wrapper">
        <s.Portfolio className="header-wrapper">
          <s.StyledH1 className="artist-page-title">
            {artist.nickname}
          </s.StyledH1>

          <s.Portfolio className="header-container">
            <s.Portfolio className="mid-box-left">
              <s.StyledH2 className="artist-description">
                {artist.nickname} Mauris enim leo, rhoncus sed, vestibulum sit
                amet, cursus id, turpis. Integer aliquet, massa id lobortis
                convallis, tortor risus dapibus augue, vel accumsan tellus nisi
                eu orci. Mauris lacinia sapien quis libero.
              </s.StyledH2>
            </s.Portfolio>

            <s.Portfolio className="mid-box-right">
              {[
                { label: "Works", value: "100+" },
                {
                  label: "Region",
                  value: `${artist.street_address}, ${artist.city}`,
                  onClick: handleCopy,
                },
                {
                  label: "Email",
                  value: artist.email,
                  href: `mailto:${artist.email}`,
                },
              ].map(({ label, value, onClick, href }, idx) => (
                <PopUpBelow delay={0.2 * (idx + 1)} key={label}>
                  <s.Portfolio className="header-profile">
                    <s.Portfolio className="header-profile-box">
                      <s.StyledP className="small">{label}</s.StyledP>
                      {href ? (
                        <s.Atag
                          href={href}
                          title={`${label} 보내기`}
                          className="artist-contact"
                        >
                          {value}
                        </s.Atag>
                      ) : (
                        <s.Atag onClick={onClick} className="artist-contact">
                          {value}
                        </s.Atag>
                      )}
                    </s.Portfolio>
                    <s.Line className="horizontal dark" />
                  </s.Portfolio>
                </PopUpBelow>
              ))}

              <PopUpBelow delay={0.8}>
                <s.Portfolio className="ask-btn-box">
                  <HoverButton
                    circle={false}
                    text=" 작가에게 문의하기"
                    onClick={handleNavigation}
                    className="center"
                  />
                </s.Portfolio>
              </PopUpBelow>
            </s.Portfolio>
          </s.Portfolio>
        </s.Portfolio>

        <s.Portfolio className="profile-image-container">
          <s.Image
            src={artist.randomImage}
            alt="image"
            className="artist-page-profile"
          />
          <s.StyledH3 className="profile-portfolio">PORTFOLIO</s.StyledH3>
        </s.Portfolio>

          <s.Portfolio className="work-wrapper">
            <s.Portfolio className="work-container-left">
              <s.StyledH3 className="work-title">What I do</s.StyledH3>
              <s.ArrowIcon />
            </s.Portfolio>

            <s.Line className="vertical dark margin-v " />

            <ArtistSkillComponent hash={artist.hash || []} />
          </s.Portfolio>
        </s.Portfolio>

        <s.Portfolio className="img-wrapper">
          <s.Image
            className="artist-page-portfolio"
            src={artist.randomImage01}
            alt="image"
          />
        </s.Portfolio>

        <s.Portfolio className="mid-wrapper">
          <s.Portfolio className="header-container">
            <s.Portfolio className="mid-box-left">
              <s.StyledH2 className="artist-description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                dicta ut, fugit neque explicabo totam tenetur eum et odit ipsa
                nulla repudiandae commodi voluptas quos molestiae nostrum autem
                hic itaque?
              </s.StyledH2>
            </s.Portfolio>

            <s.Line className="vertical dark display-narrow" />

            <s.Portfolio className="mid-box-right centered">
              <s.StyledH4 className="profile-sns">Have a Look</s.StyledH4>
              <s.Portfolio className="sns-box">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <s.FaceBookIcon className="outlined" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <s.InstagramIcon className="outlined" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <s.YoutubeIcon className="outlined" />
                </a>
              </s.Portfolio>
            </s.Portfolio>
          </s.Portfolio>
        </s.Portfolio>
    </>
  );
};

export default ArtistProfile;
