import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { useRouter } from "next/router";

import UserContainer from "containers/User/UserContainer";

import { userApi } from "shared/api";

const UserInfo = ({ userNo, currentUser, error }) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.replace("/error");
      return;
    }
  }, [router, error]);
  console.log(currentUser);

  if (!currentUser || !currentUser.user_no) {
    return null;
  }
  console.log("currentUser", currentUser);
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 유저 정보</title>
        <meta
          name="description"
          content={`푸쉬 마이 드림 | ${currentUser.nickname} 정보 `}
        />
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content={`khanteum,${currentUser.nickname},칸컴스`}
        />
        <meta property="og:title" content={`${currentUser.nickname} 정보`} />
        <meta
          property="og:description"
          content={`${currentUser.nickname} 정보 | ${currentUser.introduce}`}
        />
        <meta property="og:image" content={currentUser.user_photo} />
        <meta property="og:url" content="" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <UserContainer _currentUser={currentUser} />
    </>
  );
};

UserInfo.getInitialProps = async (context) => {
  const { user_no } = context.query;

  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const result = await userApi.get("/info", {
      params: {
        userNo: user_no,
      },
      withCredentials: true,
      ...serverCondition,
    });

    console.log(result.data);

    return {
      userNo: Number(user_no),
      currentUser: result.data.user,
    };
  } catch (err) {
    console.log(err);
    return { userNo: Number(user_no), error: 1 };
  }
};

export default UserInfo;
