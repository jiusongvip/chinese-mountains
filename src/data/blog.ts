export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
  content: { type: "p" | "h2" | "h3" | "ul"; text?: string; items?: string[] }[];
}

export const allPosts: BlogPost[] = [
  {
    slug: "first-timer-guide-2026",
    title: "The First-Timer\"s Guide to Chinese Mountains (2026 Edition)",
    author: "Emma Liu",
    date: "2026-07-15",
    excerpt: "Planning your first trip to a Chinese mountain? From permits to packing lists, cable cars to crowds — everything you need to know before you go.",
    image: "/images/mountains/huangshan.webp",
    tags: ["beginners", "planning", "tips"],
    content: [
      { type: "p", text: "So you\"ve seen the photos: misty granite spires rising above an ocean of clouds. Ancient temples clinging to vertical cliffs. Endless staircases winding through bamboo forests. Chinese mountains are unlike anywhere else on Earth — and visiting them can feel intimidating if you\"ve never done it before. This guide breaks down everything you need to know." },
      { type: "h2", text: "Step 1: Pick the Right Mountain" },
      { type: "p", text: "Not all Chinese mountains are created equal. Some (like Mount Tai) are essentially giant outdoor staircases with temples. Others (like Mount Hua) involve genuinely dangerous cliff-side plank walks. Your first mountain should match your fitness level and appetite for adventure. Use our quiz on the homepage to narrow it down in 3 questions." },
      { type: "h2", text: "Step 2: Choose Your Season" },
      { type: "p", text: "This might be the single most important decision. Visit Huangshan in October and you\"ll get crystal-blue skies and golden foliage. Visit in July and you might see nothing but fog. Check our Seasonal Calendar on the homepage for month-by-month recommendations." },
      { type: "h3", text: "Golden rules of timing:" },
      { type: "ul", items: ["Avoid Chinese national holidays at all costs. Golden Week (Oct 1-7) turns famous mountains into human traffic jams.", "Spring (Mar-May) and autumn (Sep-Nov) are ideal for most peaks.", "Winter is empty and beautiful but cold — some cable cars close for maintenance.", "Summer works if you go above 2500m elevation. Low-altitude mountains are hot and crowded."] },
      { type: "h2", text: "Step 3: Book Everything in Advance" },
      { type: "p", text: "For popular mountains like Huangshan and Zhangjiajie, you cannot just show up and hike. Many now require online reservations for entry tickets, and mountain-top hotels sell out weeks ahead during peak seasons. Book accommodation and entry tickets on official platforms (usually through WeChat mini-programs) or via reputable travel agencies." },
      { type: "h2", text: "Step 4: Pack Smart" },
      { type: "ul", items: ["Hiking shoes with good grip — stone steps get slippery when wet", "Rain jacket even if the forecast is clear — mountain weather changes fast", "Layers: temperature drops roughly 6 C per 1000m elevation gain", "Cash: many mountain vendors don\"t accept international cards", "Portable charger: you\"ll take more photos than you expect"] },
      { type: "h2", text: "Step 5: Embrace the Chaos" },
      { type: "p", text: "A Chinese mountain is not a quiet wilderness experience. There will be vendors selling instant noodles at the summit. Grandmas in dress shoes will overtake you on the stairs. Someone will blast music from a Bluetooth speaker at a viewpoint. This is part of the experience. The scenery is world-class; the atmosphere is uniquely, wonderfully Chinese. Embrace both." },
    ],
  },
  {
    slug: "5-great-mountains",
    title: "The Five Great Mountains of China: Which One Matches Your Travel Style?",
    author: "David Chen",
    date: "2026-06-20",
    excerpt: "Tai, Hua, Heng (x2), and Song — the Five Great Mountains have shaped Chinese civilization for 4000 years. Here\"s how to choose between them.",
    image: "/images/mountains/huashan.webp",
    tags: ["five-great-mountains", "culture", "history"],
    content: [
      { type: "p", text: "The Five Great Mountains (Wuyue) are more than just peaks — they are the spiritual backbone of Chinese civilization. For over 4000 years, emperors made pilgrimages to these mountains to perform sacred rituals, poets composed verses about their grandeur, and ordinary people climbed their steps seeking blessing and perspective. Today, they remain among China\"s most visited natural and cultural sites." },
      { type: "h2", text: "Mount Tai (Shandong) — The Eastern Great Mountain" },
      { type: "p", text: "The most historically significant mountain in China. 72 emperors climbed its 6,600+ stone steps to perform the Fengshan sacrifice. Today, it\"s the most accessible of the Five Great Mountains, with a high-speed train station at its base. Best for: history buffs and first-time visitors who want maximum cultural density with moderate physical effort." },
      { type: "h2", text: "Mount Hua (Shaanxi) — The Western Great Mountain" },
      { type: "p", text: "The adrenaline mountain. Famous for the Plank Walk — wooden boards bolted to a vertical cliff face — and a cable car ride that some call more terrifying than the hiking. Five granite peaks connected by narrow ridges. Best for: thrill-seekers and photographers who want the most dramatic shots." },
      { type: "h2", text: "Mount Heng (Hunan) — The Southern Great Mountain" },
      { type: "p", text: "The spiritual heartland of southern China, with over 200 temples and shrines scattered across its slopes. Known for misty landscapes and Buddhist meditation retreats. Less crowded than Tai or Hua. Best for: spiritual seekers and those who prefer serene temples over tourist crowds." },
      { type: "h2", text: "Mount Heng (Shanxi) — The Northern Great Mountain" },
      { type: "p", text: "Home to the Hanging Temple — a 1500-year-old monastery literally suspended from a cliff face. The mountain itself is a geological oddity with horizontal rock strata and dramatic canyons. Best for: architecture enthusiasts and travelers interested in the intersection of Daoism, Buddhism, and Confucianism." },
      { type: "h2", text: "Mount Song (Henan) — The Central Great Mountain" },
      { type: "p", text: "The birthplace of Shaolin kung fu and Zen Buddhism. The Shaolin Temple complex at its base is one of the most famous monasteries in the world, with daily kung fu demonstrations. The mountain itself has excellent ridge walks and forest trails. Best for: martial arts enthusiasts and families (lots to do at the base)." },
    ],
  },
  {
    slug: "autumn-golden-season",
    title: "Why Autumn Is the Golden Season for Chinese Mountain Photography",
    author: "Sarah Wang",
    date: "2026-05-10",
    excerpt: "From late September to November, China\"s mountains transform into a photographer\"s paradise. Here\"s where to go and when to catch peak colors.",
    image: "/images/mountains/meili-snow.webp",
    tags: ["photography", "autumn", "seasonal"],
    content: [
      { type: "p", text: "If you can only visit China\"s mountains during one season, make it autumn. From late September through November, three things align: the summer humidity dissipates, giving you crystal-clear visibility; deciduous trees at mid-elevations explode into red, orange, and gold; and the tourist crowds thin out after the October holiday. This is the photographer\"s trifecta." },
      { type: "h2", text: "The October Window" },
      { type: "p", text: "For most mountains, the peak color window is narrow — roughly October 10-25. Before October 7, you\"re contending with Golden Week crowds. After early November, cold winds strip the leaves. Plan around the second and third weeks of October for the sweet spot." },
      { type: "h2", text: "Best Mountains for Autumn Color" },
      { type: "ul", items: ["Huangshan: Golden larch trees contrast with granite peaks. The sea of clouds peaks in October.", "Zhangjiajie: Autumn mist adds an extra layer of mystery to the sandstone pillars.", "Jiuzhaigou (Sichuan): Not a single peak but a valley of mirrored lakes reflecting autumn forests — arguably China\"s best autumn destination.", "Western Sichuan highlands: Alpine valleys at 3000-4000m turn gold in late October, with snow-capped peaks as backdrop."] },
      { type: "h2", text: "Photography Tips" },
      { type: "ul", items: ["Arrive at viewpoints before sunrise — autumn dawns produce golden light that lasts only 15-20 minutes.", "Use a polarizing filter to cut through residual haze and saturate the foliage colors.", "Include scale: a tiny figure on a trail or a temple roof makes the mountain feel immense.", "Don\"t forget vertical compositions — many autumn mountain shots work better in portrait orientation."] },
    ],
  },


  {
    slug: 'best-hiking-mountains-2026',
    title: 'Best Chinese Mountains for Hiking: From Beginner Trails to Extreme Treks (2026 Guide)',
    author: 'Alex Zhang',
    date: '2026-08-02',
    excerpt: 'Whether you want a gentle cable-car stroll or a multi-day alpine expedition, here are the 10 best Chinese mountains for hiking — ranked by difficulty, with honest assessments of what each trail really demands.',
    image: '/images/mountains/siguniang.webp',
    tags: ['hiking', 'ranking', 'beginner', 'advanced'],
    content: [
      { type: 'p', text: 'Chinese mountain hiking ranges from paved staircases with tea vendors every 500 meters to remote alpine traverses where you will not see another human for days. This guide ranks 10 mountains by difficulty and hiking quality, with honest assessments of what each trail actually demands — not what the brochures say.' },
      { type: 'h2', text: 'Tier 1: Beginner-Friendly (Cable Car + Short Walks)' },
      { type: 'p', text: 'These mountains offer world-class scenery with minimal physical demand. Ideal for families, older travelers, or anyone who wants the views without the burn.' },
      { type: 'h3', text: 'Tianmen Mountain, Hunan — 2/10 Difficulty' },
      { type: 'p', text: 'The 7.5km cable car does the work. At the summit, paved walkways and glass skywalks require only moderate walking. The 999 steps to Heaven\'s Door are optional. Total walking: 2-3 hours on flat or gently sloping paths. The glass skywalk experience adds psychological but not physical difficulty.' },
      { type: 'h3', text: 'Jade Dragon Snow Mountain, Yunnan — 3/10 (altitude factor)' },
      { type: 'p', text: 'Cable car to 4,506m. The boardwalk to 4,680m is flat with railings. The challenge here is altitude, not terrain. Spend 1-2 days in Lijiang (2,400m) to acclimatize. Bring oxygen canisters (CNY 30-50 at the base). Move slowly, and descend immediately if you feel lightheaded.' },
      { type: 'h2', text: 'Tier 2: Moderate Day Hikes (3-6 Hours, Stone Steps)' },
      { type: 'p', text: 'The classic Chinese mountain experience. Thousands of stone steps, steep but not technical, with cable car options to shorten the route if needed.' },
      { type: 'h3', text: 'Mount Huangshan, Anhui — 5/10 Difficulty' },
      { type: 'p', text: 'The gold standard. Cable car to 1,600m, then 2-4 hours of ridge walking between peaks on stone steps. The West Sea Grand Canyon descent adds 3-4 hours of knee-testing downhill. Total elevation gain: 200-400m if using cable cars, 800-1,000m if hiking from base. The steps are relentless — there are no flat sections anywhere on the summit trails.' },
      { type: 'h3', text: 'Mount Tai, Shandong — 6/10 (endurance test)' },
      { type: 'p', text: '6,666 continuous stone steps with 1,350m elevation gain over 9.5km. No exposure, no scrambling — just relentless stairs with handrails. The night climb (start at 10 PM, summit by 4 AM for sunrise) is a uniquely Chinese cultural experience. Thousands of other climbers share the trail, creating a communal pilgrimage atmosphere.' },
      { type: 'h2', text: 'Tier 3: Challenging Ridge Hikes (Full Day, Exposure)' },
      { type: 'p', text: 'These mountains require good fitness and comfort with heights. Chains, ladders, and narrow ridges with thousand-meter drops are part of the experience.' },
      { type: 'h3', text: 'Mount Hua, Shaanxi — 7-8/10 Difficulty' },
      { type: 'p', text: 'The ridge walks between five peaks involve steep staircases with chain handrails and genuine exposure. The Plank Walk is optional but unforgettable — wooden boards bolted to a vertical cliff face at 2,160m. The traditional Soldier\'s Route footpath from the base (12km, 1,200m gain) involves near-vertical iron ladders and chain-assisted climbing. Not for anyone with vertigo.' },
      { type: 'h3', text: 'Mount Sanqing, Jiangxi — 6/10 Difficulty' },
      { type: 'p', text: 'The 3.6km suspended boardwalk wraps around vertical cliff faces at 1,600m. Less physically demanding than Hua, but the psychological factor of walking on a cantilevered path with thousand-meter drops below is real. A great alternative to Huangshan with fewer crowds and equally dramatic scenery.' },
      { type: 'h2', text: 'Tier 4: Multi-Day Treks (Alpine, Remote)' },
      { type: 'p', text: 'Genuine wilderness experiences requiring proper gear, multiple days, and tolerance for basic accommodation.' },
      { type: 'h3', text: 'Mount Siguniang, Sichuan — 6-8/10 Difficulty' },
      { type: 'p', text: 'Three valleys offer everything from paved boardwalks (Shuangqiao) to full-day alpine lake treks above 4,000m (Haizi). Changping Valley is the sweet spot: a full-day hike to a viewpoint directly facing the summit of Yaomei Feng at 6,250m. Altitude is the main challenge — valley floors sit at 3,200-3,800m.' },
      { type: 'h3', text: 'Haba Snow Mountain, Yunnan — 8/10 (glacier + altitude)' },
      { type: 'p', text: 'A 3-4 day mountaineering expedition to 5,396m. Requires crampons, ice axe, and rope team travel on the glacier, but no technical rock or ice climbing. Summit day involves 1,200m gain over 6-8 hours with a 3 AM alpine start. No prior mountaineering experience needed, but excellent fitness and altitude tolerance are essential. Oxygen at the summit: approximately 50 percent of sea level.' },
      { type: 'h2', text: 'How to Choose the Right Mountain' },
      { type: 'p', text: 'Be honest about your fitness, comfort with heights, and tolerance for discomfort. A 6,000-step staircase in 30 C heat with 80 percent humidity is harder than it sounds. Altitude sickness does not discriminate by fitness level — marathon runners can be incapacitated at 4,000m while sedentary visitors feel fine. Start with one Tier 1 or 2 mountain. If you enjoy it, work your way up. Every elite mountaineer started somewhere.' },
    ],
  },
  {
    slug: 'mountain-photography-guide',
    title: 'Ultimate China Mountain Photography Guide: Best Locations, Seasons & Techniques',
    author: 'Sarah Wang',
    date: '2026-08-01',
    excerpt: 'From Huangshan\'s sea of clouds to Zhangye\'s rainbow layers — where to shoot, when to go, what gear to bring, and how to capture the shot that makes people ask if that photo is real.',
    image: '/images/mountains/meili-snow.webp',
    tags: ['photography', 'guide', 'seasonal', 'gear'],
    content: [
      { type: 'p', text: 'Chinese mountains are among the most photogenic landscapes on Earth — and among the most challenging to photograph well. Fog rolls in without warning. Crowds photobomb your sunrise composition. The mountain you drove eight hours to shoot hides behind clouds for three days straight. This guide covers the best locations, optimal seasons, essential gear, and field-tested techniques for capturing images that do justice to these landscapes.' },
      { type: 'h2', text: 'Top 5 Photography Mountains' },
      { type: 'h3', text: '1. Huangshan — The Sea of Clouds' },
      { type: 'p', text: 'The holy grail of Chinese mountain photography. The sea of clouds phenomenon occurs on clear mornings after cold fronts, most commonly October-November and January-February. Position at Dawn Pavilion by 5:00 AM. Use 24-70mm for the wide scene and 70-200mm to isolate individual spires emerging from mist. The Welcoming Pine at sunrise, shot with a telephoto compressing the background peaks into layered backdrops, is the iconic frame. Stay at a summit hotel so you are already in position before sunrise — cable cars do not start early enough.' },
      { type: 'h3', text: '2. Zhangye Danxia — Rainbow Mountains' },
      { type: 'p', text: 'The multicolored rock strata look photoshopped in person. Shoot at golden hour (30 minutes before sunset) when low-angle light intensifies red and orange bands. A polarizing filter reduces glare on rock surfaces and saturates colors. Include the boardwalk and viewing platforms as scale elements. Platform 4 offers the widest panorama. Arrive by 3:00 PM, claim your spot, and wait for the light. Autumn (September-October) offers the clearest air.' },
      { type: 'h3', text: '3. Meili Snow Mountain — Golden Sunrise' },
      { type: 'p', text: 'The Golden Mountain effect — first sunlight striking Kawagarbo\'s ice in gold, rose, and amber — is visible 60-80 days per year, most reliably October-December. Shoot from Feilai Temple viewpoint. A 100-400mm telephoto is essential — you are 20km from a 6,740m peak. Bracket exposures for the extreme contrast between illuminated summit and shadowed valleys. The moment lasts 5-10 minutes when it happens. Do not spend it fumbling with settings.' },
      { type: 'h3', text: '4. Zhangjiajie — Pillars and Mist' },
      { type: 'p', text: 'The floating mountain effect requires partial mist. April-May and September-October, arriving at Yuanjiajie by 7:00 AM, offers the best odds. Wide-angle (16-35mm) captures scale; telephoto isolates formations through mist layers. The Tianzi Mountain panorama at sunrise, with hundreds of pillars emerging from clouds, is the definitive Zhangjiajie shot. Bring a rain cover — mountain mist is essentially suspended rain.' },
      { type: 'h3', text: '5. Guilin/Yangshuo — Karst at Dawn' },
      { type: 'p', text: 'The classic shot — bamboo rafts on the Li River with karst peaks receding in mist — is best at dawn from the riverbank near Yangshuo. Cormorant fishermen at dusk are staged (negotiate CNY 100-300), but authentic to a centuries-old tradition. For elevation, climb Xianggong Hill (30 min, 250m) for sunrise — the view is the 20-yuan note landscape.' },
      { type: 'h2', text: 'Essential Gear for Mountain Photography' },
      { type: 'ul', items: ['Tripod: non-negotiable for pre-dawn exposures of 1-4 seconds.', 'Polarizing filter: the single most useful filter. Cuts haze, saturates foliage, reduces glare on wet rock.', 'Lenses: 16-35mm for wide landscapes, 70-200mm for compressing layered peaks. If you can only bring two, bring these.', 'Rain cover: mountain weather changes in minutes. A simple rainsleeve costs under CNY 50 and saves thousands in gear.', 'Extra batteries: cold summit mornings drain batteries 2-3x faster than normal. Bring at least 3.', 'Lens cloths: mist, waterfall spray, and your breath in cold air will fog your lens constantly. Bring multiple cloths.'] },
      { type: 'h2', text: 'The One Tip That Matters Most' },
      { type: 'p', text: 'Arrive early. At every mountain on this list, the best light is at sunrise, and the best compositions are claimed by 6:00 AM. If you arrive at 9:00 AM, you are not a photographer — you are a tourist with a nice camera. The difference between a good mountain photograph and a great one is almost always waking up at 4:00 AM and being in position before the light arrives. The mountains reward those who sacrifice sleep.' },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}