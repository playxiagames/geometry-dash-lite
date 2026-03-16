import json

with open('src/data/games.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 前10个游戏的更新内容
updates = {
    "geometry-dash-3d": {
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
}

# 应用更新
for game in data['games']:
    if game['id'] in updates:
        game['longDescription'] = updates[game['id']]['longDescription']
        game['faq'] = updates[game['id']]['faq']
        game['tips'] = updates[game['id']]['tips']
        print(f"Updated: {game['id']}")

with open('src/data/games.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Batch 1 complete!")
