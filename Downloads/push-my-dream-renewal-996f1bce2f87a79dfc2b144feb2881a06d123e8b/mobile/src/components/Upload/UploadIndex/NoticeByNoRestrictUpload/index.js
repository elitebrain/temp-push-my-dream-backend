import React from "react";

import GradientBox from "components/Common/GradientBox";
import Content from "components/Layout/Content";
import Noti from "components/Common/Noti";

import issues_close_ico from "public/assets/icon/issues_close(red).svg";

import { COLOR_979CCA } from "shared/constants/colors";

const NoticeByNoRestrictUpload = () => {
  return (
    <div>
      <GradientBox maxWidth>
        <div className="NoticeByNoRestrictUpload_Notice">
          <div className="Image">
            <img src={issues_close_ico} width="100%" height="100%" />
          </div>
          <div className="Content">
            <p>업로드가 제한된 계정입니다.</p>
            <p>관리자에게 문의하여 주시기 바랍니다.</p>
          </div>
        </div>
      </GradientBox>
      <Content>
        <div className="Noti">
          <Noti title="업로드 제한">
            서비스 운영 정책에 따라 특정 사유에 해당될 경우 업로드가 제한될 수
            있습니다. 자세한 내용은 관리자에게 문의해주시기 바랍니다.
          </Noti>
        </div>
      </Content>

      <style jsx>{`
        .NoticeByNoRestrictUpload_Notice {
          display: flex;
          height: 60px;
          align-items: center;
        }

        .NoticeByNoRestrictUpload_Notice .Image {
          flex-basis: 60px;
          margin-right: 20px;
          width: 60px;
          height: 60px;
        }

        .NoticeByNoRestrictUpload_Notice .Image img {
          vertical-align: top;
        }

        .NoticeByNoRestrictUpload_Notice .Content {
          font-size: 14px;
          color: ${COLOR_979CCA};
          flex: 1;
        }

        .Noti {
          display: block;
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
};

export default NoticeByNoRestrictUpload;
