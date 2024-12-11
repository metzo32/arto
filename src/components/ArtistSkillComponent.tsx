import React from "react";
import s from "../stores/styling";

interface ArtistSkillProps {
  hash: string[];
}

const ArtistSkillComponent = ({ hash }: ArtistSkillProps) => {
  return (
    <s.Portfolio className="work-container-right">
      {hash.map((skill, index) => {
        //index를 기준으로
        if (index % 2 === 0) {
          // 짝수일 때만 발생 (요소 2칸씩 렌더링)
          return (
            <React.Fragment key={index}>
              <s.Portfolio className="work-box">
                <s.Portfolio className="work-div">
                  <s.StyledH4 className="work">{skill}</s.StyledH4>
                  <s.StyledP className="work-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ratione soluta quo quia, eos quisquam hic laudantium, illo
                    harum deserunt magnam corrupti, temporibus.
                  </s.StyledP>
                </s.Portfolio>

                {index + 1 < hash.length && ( //이 조건이 만족할 경우 (다음 요소가 있는 경우) 수직 라인 추가하여 다음 요소 렌더링
                  <>
                    <s.Line className="vertical dark margin-v" />
                    <s.Portfolio className="work-div">
                      <s.StyledH4 className="work">
                        {hash[index + 1]}
                      </s.StyledH4>
                      <s.StyledP className="work-description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Obcaecati quia alias modi quibusdam excepturi
                        blanditiis suscipit deleniti, harum soluta corporis.
                      </s.StyledP>
                    </s.Portfolio>
                  </>
                )}
              </s.Portfolio>

              {index + 2 < hash.length && ( // 이 다음에 요소가 2개 더 있다면 수평선 렌더
                <s.Line className="horizontal dark margin-h display" />
              )}
            </React.Fragment>
          );
        }
        return null; //index가 홀수라면 아무것도 그리지 않음
      })}
    </s.Portfolio>
  );
};

export default ArtistSkillComponent;
