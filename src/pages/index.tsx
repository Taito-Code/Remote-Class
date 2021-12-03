import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import { useRealtimeCursor, useRealtimeUserAction } from "realtimely";
import logout from "lib/logout";
import { useAuth } from "context/useAuth";
import { GetServerSideProps } from "next";
import { CustomCursorViewParameter } from "realtimely/dist/components/CursorAnimate";
import CursorIcon from "components/CursorIcon";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { currentUser } = useAuth();
  const { onMouseMove, renderCursors } = useRealtimeCursor(
    100,
    JSON.stringify(currentUser)
  );

  const customView = (param: CustomCursorViewParameter) => {
    return <CursorIcon userInfo={param.customInfo} />;
  };

  return (
    <Box background={"grey"}>
      <div>
        <Button colorScheme="blue" onClick={logout}>
          logout
        </Button>
        <div>
          <div className={styles.container} onClick={onMouseMove}>
            <main className={styles.main}>{renderCursors(customView)}</main>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Home;
