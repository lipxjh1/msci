import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Image from "next/image";
import Footer from "@/app/home/components/Footer";

export const metadata = {
  title: "Game Mechanics | Overwatch Clone",
  description: "Learn about the mechanics and rules of the Overwatch Clone game",
};

export default function MechanicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ResponsiveNavigation />

      {/* Hero section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner/trangchu.jpg"
            alt="Game Mechanics"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-transparent to-[#0a141e] z-10"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-300"></div>
          </div>

          {/* Add scanline effect */}
          <div className="absolute inset-0 scanline"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
                <span className="relative inline-block">
                  GAME PLAY
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-16 pb-20 relative z-30">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2">
                <h2 className=" text-3xl font-bold text-white mb-6 relative inline-block">
                  Mechanics Overview
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  M-SCI is a sci-fi tactical action game with fast-paced 30-second battles. Players control a team of 3 heroes from three different classes:{" "}
                  <span className="text-[#F44336] font-medium">Gunner</span>,{" "}
                  <span className="text-[#3f51b5] font-medium">Sniper</span>,
                  or{" "}
                  <span className="text-[#4CAF50] font-medium"> Rocket</span>.
                </p>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  The main objective of the game is to work as a team to eliminate The Ascended's robot forces and complete missions. Each hero has unique basic skills, special abilities, and Ultimate Skills that can turn the tide of battle in crucial moments.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      3v3
                    </div>
                    <div className="text-white/60 text-sm">Team Format</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      30+
                    </div>
                    <div className="text-white/60 text-sm">Heroes</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      20+
                    </div>
                    <div className="text-white/60 text-sm">Maps</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-xl">
                  <Image
                    src="/images/co-che/biet-doi.jpg"
                    alt="Game mechanics"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-bold text-lg mb-2">
                      Overwatch Squad
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 px-3 bg-[#F44336]/20 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                        <span className="text-[#F44336] font-medium text-sm">
                          Gunner
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#3f51b5]/20 backdrop-blur-sm rounded-md border border-[#3f51b5]/30">
                        <span className="text-[#3f51b5] font-medium text-sm">
                          Sniper
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#4CAF50]/20 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                        <span className="text-[#4CAF50] font-medium text-sm">
                          Rocket
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Game modes */}
          <div className="mb-16">
            <h2 className=" text-3xl font-bold text-white mb-8 relative inline-block">
              Game Modes
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Play */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/camping.jpg"
                    alt="Quick Play"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#F44336]/30 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                    <span className="text-white font-medium text-sm">
                      Popular
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#F44336] transition-colors">
                    Campaign
                  </h3>
                  <p className="text-white/70 mb-4">
                    Experience the M-SCI storyline through 100 exciting levels divided into 5 zones. Each match lasts 30 seconds, and players must eliminate all enemies before time runs out.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Wait time: ~2 seconds
                    </div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">3v3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/rank.jpg"
                    alt="Competitive"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#FFD700]/30 backdrop-blur-sm rounded-md border border-[#FFD700]/30">
                    <span className="text-white font-medium text-sm">
                      Ranked
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                    Ranked
                  </h3>
                  <p className="text-white/70 mb-4">
                    Competitive mode with daily active point leaderboards. Collect points through missions and boss eliminations to climb ranks from Rookie to Legend.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Wait time: ~3-5 seconds
                    </div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">3v3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arcade */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/boss.jpg"
                    alt="Arcade"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#9C27B0]/30 backdrop-blur-sm rounded-md border border-[#9C27B0]/30">
                    <span className="text-white font-medium text-sm">
                      Entertainment
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#9C27B0] transition-colors">
                    Events
                  </h3>
                  <p className="text-white/70 mb-4">
                    Exciting events like World Boss, Elite Boss, and many time-limited activities. Join the community to receive exclusive rewards.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Wait time: ~1-3 minutes
                    </div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">Various</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Games */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/guild.jpg"
                    alt="Custom Games"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#2196F3]/30 backdrop-blur-sm rounded-md border border-[#2196F3]/30">
                    <span className="text-white font-medium text-sm">
                      Custom
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#2196F3] transition-colors">
                    Guild War
                  </h3>
                  <p className="text-white/70 mb-4">
                    Join your guild in daily Guild War battles, invade other guilds or declare wager challenges to claim glory and rewards.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">Self-determined</div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">Optional</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seasonal Events */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/even.jpg"
                    alt="Seasonal Events"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#4CAF50]/30 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                    <span className="text-white font-medium text-sm">
                      Limited
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#4CAF50] transition-colors">
                    Seasonal Events
                  </h3>
                  <p className="text-white/70 mb-4">
                    Seasonal events with special game modes, limited skins, and new storyline content. Participate to receive rare time-limited items.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Wait time: ~2 minutes
                    </div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">Seasonal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workshop */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/shop.jpg"
                    alt="Workshop"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute top-4 left-4 p-2 px-3 bg-[#FF9800]/30 backdrop-blur-sm rounded-md border border-[#FF9800]/30">
                    <span className="text-white font-medium text-sm">
                      Creative
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" text-xl font-bold text-white mb-2 group-hover:text-[#FF9800] transition-colors">
                    Workshop
                  </h3>
                  <p className="text-white/70 mb-4">
                    Use the Center Market to trade characters, items, and resources with other players. Build your collection and do business in the M-SCI world.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-sm">
                      Fully customizable
                    </div>
                    <div className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                      <span className="text-white/80 text-sm">
                        Unlimited
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Roles */}
          <div className="mb-16">
            <h2 className="font-orbitron text-3xl font-bold text-white mb-8 relative inline-block">
              Game Roles
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tank */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-[#F44336]/20 transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/guner.jpg"
                    alt="Machine Gunner (Gunner)"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className=" text-2xl font-bold text-[#F44336] mb-4">
                    Machine Gunner (Gunner)
                  </h3>
                  <p className="text-white/70 mb-6">
                    Gunners are equipped with machine guns with extremely high firing rates, specializing in rapid damage at close and medium range. They are a force that quickly sweeps through multiple targets but are less effective against Drones and shielded enemies.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">Extremely high fire rate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">
                        {" "}
                        Strong close-range damage
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">
                        {" "}
                        Crowd clearing ability
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DPS */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-[#3f51b5]/20 transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/spine.jpg"
                    alt="Sniper"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className=" text-2xl font-bold text-[#3f51b5] mb-4">
                    Sniper
                  </h3>
                  <p className="text-white/70 mb-6">
                    Snipers use long-range scoped rifles, firing slowly but delivering massive damage with precision. They are the bane of flying Drones, able to eliminate targets from a safe distance but weak in close combat.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">
                        High single-target damage
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">
                        Drone elimination ability (+1000%)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#3f51b5]"></div>
                      <span className="text-white/80">
                        Absolute precision
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-[#4CAF50]/20 transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src="/images/co-che/roket.jpg"
                    alt="Rocket Soldier"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className=" text-2xl font-bold text-[#4CAF50] mb-4">
                    Rocket Soldier
                  </h3>
                  <p className="text-white/70 mb-6">
                    Rocket soldiers use missile launchers or cannons, dealing powerful area-of-effect damage. They are experts at breaking enemy shields but have the slowest firing rate among the three classes.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">
                        Area-of-effect damage
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">
                        Shield breaking ability (+1000%)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">
                        {" "}
                        Effective against clustered enemies
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer section */}
          <div className="mt-16 bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <h2 className=" text-2xl font-bold text-white mb-4">
                Ready to fight for humanity?
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Now that you understand the character classes of M-SCI, recruit your heroes, join the 30-second battles, and stop The Ascended!
              </p>
              <button className="px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-[#F44336] to-[#e53935] hover:from-[#e53935] hover:to-[#F44336] transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30">
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Footer component */}
      <Footer />
    </div>
  );
} 