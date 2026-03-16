import json

# 读取原始数据
with open('src/data/games.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 准备所有20个游戏的升级内容
updates = {}

# 1. geometry-dash-3d
updates["geometry-dash-3d"] = {
    "longDescription": "Geometry Dash 3D revolutionizes the classic rhythm platformer by introducing stunning three-dimensional graphics and immersive depth perception that transforms how you experience every obstacle. When you play Geometry Dash 3D online free, you'll discover a game that maintains the addictive one-touch gameplay of the original while adding breathtaking visual layers that make platforms, spikes, and moving obstacles pop off the screen with realistic shadows and perspective shifts. The 3D rendering engine creates dynamic camera angles that rotate and zoom as you progress, offering fresh viewpoints on familiar geometric challenges while introducing entirely new spatial puzzles that require depth judgment alongside timing precision. What sets this version apart is how the enhanced graphics don't just serve aesthetics—they fundamentally change gameplay by adding visual cues through lighting effects, particle systems, and environmental details that pulse with the electronic soundtrack. The game features multiple difficulty modes ranging from beginner-friendly tutorials to expert-level gauntlets where 3D obstacles spin, flip, and transform in ways impossible in 2D space. Players love how the dimensional depth adds strategic complexity: you must now consider not just when to jump but also how obstacles align in 3D space, creating mind-bending sequences where timing meets spatial reasoning. The vibrant neon aesthetics are amplified by volumetric lighting, bloom effects, and dynamic shadows that react to your movements, making every successful run feel like a choreographed dance through a digital wonderland. Whether you're a series veteran seeking fresh challenges or a newcomer drawn to modern graphics, Geometry Dash 3D delivers an evolution that respects the original's tight controls while pushing the formula into exciting new territory. The combination of rhythm-based gameplay, enhanced visual feedback, and innovative 3D obstacle design creates an experience that's both familiar and revolutionary, proving that sometimes adding a new dimension is exactly what a classic needs.",
    "faq": [
        {"q": "Is Geometry Dash 3D free to play online?", "a": "Yes, you can play Geometry Dash 3D online free directly in your browser without any downloads or payments. The game offers full access to its 3D-enhanced levels and features, making it an excellent way to experience rhythm platforming with modern graphics. No registration or installation is required—just click and start playing immediately."},
        {"q": "How does 3D gameplay differ from the original Geometry Dash?", "a": "Geometry Dash 3D adds depth perception and three-dimensional obstacles that require spatial awareness alongside timing. The camera dynamically rotates and zooms, creating new perspectives on challenges. Obstacles can now move in 3D space, spin on multiple axes, and create visual puzzles impossible in 2D. However, the core one-touch controls remain unchanged, ensuring accessibility."},
        {"q": "What are the best strategies for 3D obstacles?", "a": "Focus on visual depth cues like shadows and lighting to judge obstacle positions. Watch how objects scale as they approach—larger means closer. Use the dynamic camera angles to your advantage by anticipating perspective shifts. Practice levels multiple times to build spatial memory, as 3D patterns require different mental mapping than 2D sequences."},
        {"q": "Do I need special equipment to play Geometry Dash 3D?", "a": "No special equipment is needed—the game runs in standard web browsers on regular computers and mobile devices. While the 3D graphics are enhanced, they're optimized for smooth performance on most hardware. Headphones are recommended to fully appreciate the synchronized soundtrack that guides your timing through the dimensional obstacles."},
        {"q": "Can I play custom levels in Geometry Dash 3D?", "a": "Geometry Dash 3D focuses on curated 3D-enhanced levels designed specifically to showcase the dimensional gameplay mechanics. Unlike the full Geometry Dash with its level editor, this version prioritizes quality over quantity, offering carefully crafted stages that demonstrate what's possible when rhythm platforming meets three-dimensional design. Each level is optimized for the 3D experience."}
    ],
    "tips": [
        "Watch shadow positions to judge obstacle depth and distance accurately",
        "Let camera rotations guide your timing—they sync with beat patterns",
        "Practice 3D sections in slow motion to understand spatial relationships",
        "Use peripheral vision to track obstacles approaching from different depths",
        "Focus on one dimensional plane at a time when overwhelmed",
        "Listen for audio cues that signal perspective shifts and camera changes",
        "Start with 2D-style levels before tackling full 3D spatial challenges",
        "Notice how lighting intensity indicates obstacle proximity and danger zones",
        "Take breaks to prevent depth perception fatigue during long sessions",
        "Adjust screen brightness for optimal visibility of 3D depth effects"
    ]
}

# 2. geometry-vibes-monster
updates["geometry-vibes-monster"] = {
    "longDescription": "Geometry Vibes Monster takes the rhythm-based formula in a completely different direction by transforming you into a spaceship pilot battling through waves of uniquely designed monsters in an endless survival arena. When you play Geometry Vibes Monster online free, you'll face eight distinct monster types, each with carefully programmed attack patterns ranging from straight-line charges to complex spiral bullet formations that demand quick reflexes and pattern recognition skills. The game brilliantly combines classic dodge-and-weave spaceship mechanics with the rhythmic timing that made Geometry Dash famous, creating a hybrid experience where music synchronization meets bullet-hell intensity. What makes this version special is its dual-mode structure: endless survival mode tests how long you can last against increasingly aggressive monster waves, while multiplayer racing mode lets you compete against friends to see who can navigate the monster gauntlet fastest. The retro-inspired pixel art aesthetic gives each monster distinct visual personality—from pulsing blob creatures to angular geometric predators—making pattern recognition intuitive even during chaotic moments. The spaceship controls are elegantly simple with hold-to-rise and release-to-fall mechanics, but mastering the subtle altitude adjustments needed to thread between monster attacks while maintaining forward momentum requires genuine skill development. Players appreciate how the game rewards both reactive dodging and proactive positioning, as learning to anticipate monster spawn locations and attack timings transforms frantic survival into graceful aerial ballet. The progressive difficulty curve ensures accessibility for newcomers while providing endless challenge for veterans, with monster combinations becoming increasingly devious as your survival time extends. Whether you're chasing high scores in solo mode or trash-talking friends in competitive races, Geometry Vibes Monster delivers addictive gameplay that proves the Geometry Dash formula can thrive in unexpected genres. The combination of monster variety, smooth controls, and that signature rhythm-game satisfaction creates an experience that stands proudly alongside its platforming siblings.",
    "faq": [
        {"q": "Is Geometry Vibes Monster free to play?", "a": "Yes, Geometry Vibes Monster is completely free to play online in your browser. You get full access to all eight monster types, endless survival mode, and multiplayer racing features without any payments or downloads. The game runs smoothly on most devices, making it easy to jump into monster-dodging action anytime you want."},
        {"q": "How do the eight different monsters behave?", "a": "Each monster has unique attack patterns that you'll learn to recognize. Some charge in straight lines, others weave unpredictably, while advanced monsters fire projectiles or create barrier formations. The key to survival is memorizing these behaviors and positioning your spaceship accordingly. As you progress, monsters combine their attacks, creating complex challenges that test your pattern recognition."},
        {"q": "What's the difference between endless and multiplayer modes?", "a": "Endless survival mode focuses on lasting as long as possible against increasingly difficult monster waves, perfect for practicing patterns and chasing high scores. Multiplayer racing mode challenges you and a friend to navigate the same monster sequence simultaneously, with the first to reach checkpoints winning. Racing adds competitive pressure that transforms familiar patterns into nail-biting contests."},
        {"q": "What strategies help survive longer in endless mode?", "a": "Stay calm and focus on smooth, flowing movements rather than jerky corrections. Learn to recognize monster types instantly by their appearance and position yourself before they attack. Use the full vertical space—don't cluster in the middle. Practice individual monster patterns in early waves before facing combinations. Most importantly, prioritize survival over speed."},
        {"q": "Can I play Geometry Vibes Monster on mobile devices?", "a": "Yes, the game works on mobile browsers with touch controls. Tap and hold the screen to make your spaceship rise, release to descend. The simple control scheme translates perfectly to touchscreens, though some players prefer the precision of mouse or keyboard controls for advanced patterns. Try both to see which feels more natural for your playstyle."}
    ],
    "tips": [
        "Learn each monster's attack pattern individually before facing combinations",
        "Use smooth altitude changes instead of rapid tapping for better control",
        "Position yourself opposite the monster's spawn location for maximum reaction time",
        "Watch for visual tells that signal when monsters are about to attack",
        "In multiplayer mode, focus on your own lane—don't watch your opponent",
        "Practice staying in the middle altitude range for maximum maneuverability",
        "Take mental notes of monster spawn sequences to anticipate upcoming threats",
        "Use the rhythm of monster attacks to develop timing patterns",
        "Don't chase risky paths in endless mode—consistency beats aggression",
        "Warm up with a few practice runs before attempting high-score pushes"
    ]
}

# 3. geometry-dash-deadlocked
updates["geometry-dash-deadlocked"] = {
    "longDescription": "Geometry Dash Deadlocked stands as the legendary 20th official level and one of the most feared demon-difficulty challenges in the entire series, introducing revolutionary mechanics that forever changed what players thought possible in rhythm platforming. When you play Geometry Dash Deadlocked online free, you're tackling a 99-second gauntlet that demands mastery of every game mode—cube, ship, ball, UFO, wave, and robot—while navigating through laser-shooting monsters, teleportation portals, and key-and-lock systems that create branching paths through the chaos. What makes Deadlocked truly special is its epic boss battle structure, where massive mechanical monsters fire synchronized laser patterns that you must dodge while maintaining perfect rhythm timing across mode transitions. The level rewards 15 stars upon completion, the highest of any official stage, reflecting its brutal difficulty and the prestige of conquering it. The introduction of green jump rings adds a new layer of complexity, launching you at specific angles that require spatial prediction, while teleportation portals create disorienting perspective shifts that test your adaptability. The key-and-lock system encourages exploration and rewards players who can collect keys while surviving the onslaught, unlocking secret paths that offer both shortcuts and additional challenges. The wave sections are particularly notorious, requiring pixel-perfect control through narrow corridors while lasers sweep across your path in rhythm with the intense electronic soundtrack. What elevates Deadlocked beyond mere difficulty is its impeccable design—every obstacle placement feels intentional, every transition flows naturally, and the boss encounters create genuine dramatic tension that makes victory feel earned rather than lucky. The level has become a rite of passage in the Geometry Dash community, with countless players spending hours mastering its intricacies and sharing strategies for its most challenging sections. Whether you're attempting your first clear or hunting for all three secret coins, Deadlocked delivers an experience that perfectly balances frustration with the euphoria of gradual improvement and eventual triumph.",
    "faq": [
        {"q": "Is Geometry Dash Deadlocked really that difficult?", "a": "Yes, Deadlocked is rated as a demon-difficulty level, placing it among the hardest official stages. It requires mastery of all game modes, precise wave control, and memorization of complex patterns. However, with practice mode and persistence, most dedicated players can eventually conquer it. The difficulty is fair—every death teaches you something, making progress feel rewarding rather than impossible."},
        {"q": "How do the boss battles work in Deadlocked?", "a": "Boss encounters feature large mechanical monsters that fire laser patterns synchronized with the music. You must dodge these attacks while navigating normal obstacles and switching between game modes. Each boss has predictable patterns that you'll learn through repetition. The key is staying calm, recognizing attack sequences, and maintaining rhythm timing even during intense moments."},
        {"q": "What are the key-and-lock systems used for?", "a": "Keys scattered throughout the level unlock special gates that reveal secret paths, shortcuts, or areas containing the three secret coins. Collecting keys requires risky detours from the main path, adding strategic decision-making to the challenge. You don't need keys to complete the level, but collecting all coins requires finding and using them strategically."},
        {"q": "Should I use practice mode for Deadlocked?", "a": "Absolutely. Practice mode is essential for learning Deadlocked's complex patterns without the frustration of restarting from the beginning after every mistake. Focus on mastering individual sections—especially the wave parts—before attempting full runs. Most successful players spend hours in practice mode building muscle memory for each segment before linking them together."},
        {"q": "How long does it take to beat Deadlocked?", "a": "This varies dramatically based on skill level. Experienced players might clear it in a few hours, while newcomers to demon-difficulty levels could spend days or weeks. The 99-second level typically requires hundreds of attempts as you gradually memorize patterns and build consistency. Don't get discouraged—every failed attempt is progress toward eventual victory."}
    ],
    "tips": [
        "Master wave sections in practice mode first—they're the hardest parts",
        "Memorize boss laser patterns by watching them in practice without moving",
        "Use the music as a timing guide for jumps and mode transitions",
        "Focus on one section at a time rather than worrying about the full level",
        "Learn the key locations if you want to collect all three secret coins",
        "Stay relaxed during boss fights—tension causes mistimed inputs",
        "Watch successful runs on YouTube to see optimal paths and strategies",
        "Take breaks when frustrated to return with fresh focus and muscle memory",
        "Practice the final wave section extensively—it's where most runs end",
        "Celebrate reaching new checkpoints—progress is progress, even without completion"
    ]
}

print("Script ready. Run to update games.json")
