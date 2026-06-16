import { useState } from "react";

import AnimatedBackground from "../../components/common/AnimatedBackground";

import PageContainer from "../../components/ui/PageContainer";

import HeroSection from "../../components/Home/HeroSection";
import GameMenu from "../../components/Home/GameMenu";
import FeatureGrid from "../../components/Home/FeatureGrid";
import HomePreview from "../../components/Home/HomePreview";
import CreateRoomModal from "../../components/Home/CreateRoomModal";
import JoinRoomModal from "../../components/Home/JoinRoomModal";

function Home() {

  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">

      <AnimatedBackground />

      <PageContainer>

        <div className="grid min-h-screen items-center gap-16 lg:grid-cols-2">

          <div>

            <HeroSection />

            <GameMenu
              onCreate={() => setCreateOpen(true)}
              onJoin={() => setJoinOpen(true)}
            />

            <FeatureGrid />

          </div>

          <HomePreview />

        </div>

      </PageContainer>

      <CreateRoomModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <JoinRoomModal
        open={joinOpen}
        onClose={() => setJoinOpen(false)}
      />

    </div>
  );
}

export default Home;