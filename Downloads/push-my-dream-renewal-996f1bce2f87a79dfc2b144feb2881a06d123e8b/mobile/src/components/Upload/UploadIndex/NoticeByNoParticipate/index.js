import React from "react";
import Link from "next/link";

import GradientBox from "components/Common/GradientBox";
import Content from "components/Layout/Content";
import NewButton from "components/Common/NewButton";
import Noti from "components/Common/Noti";

import issues_close_gradient_ico from "public/assets/icon/issues_close(gradient).svg";

import { BACKGROUND_BLACK_COLOR, COLOR_979CCA } from "shared/constants/colors";

const NoticeByNoParticipate = () => {
  return (
    <div>
      <GradientBox maxWidth>
        <div className="NoticeByNoParticipate_Notice">
          <div className="Image">
            <img src={issues_close_gradient_ico} width="100%" height="100%" />
          </div>
          <div className="Content">
            <p>참가중인 경연이 없습니다.</p>
            <p>경연 참가 신청 후</p>
            <p>영상 업로드가 가능합니다.</p>
          </div>
        </div>
      </GradientBox>
      <Content>
        {/* todo 수정 */}
        <Link href="/season">
          <a className="NoticeByNoParticipate_Link">
            <NewButton height="40px" bgColor={BACKGROUND_BLACK_COLOR} gradient>
              참가 신청 하러 하기
            </NewButton>
          </a>
        </Link>
        <Noti title="영상 업로드">
          참여중인 경연에만 영상 업로드가 가능하며, 진행중인 경연은 동시에 참여
          할 수 없습니다.
        </Noti>
      </Content>

      <style jsx>{`
        .NoticeByNoParticipate_Notice {
          display: flex;
          height: 60px;
          align-items: center;
        }

        .NoticeByNoParticipate_Notice .Image {
          flex-basis: 60px;
          margin-right: 20px;
          width: 60px;
          height: 60px;
        }

        .NoticeByNoParticipate_Notice .Image img {
          vertical-align: top;
        }

        .NoticeByNoParticipate_Notice .Content {
          font-size: 14px;
          color: ${COLOR_979CCA};
          flex: 1;
        }

        .NoticeByNoParticipate_Link {
          display: block;
          margin: 30px 0 40px 0;
        }
      `}</style>
    </div>
  );
};

export default NoticeByNoParticipate;
