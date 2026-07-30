// ================================================================
//   ƏL İLƏ OYUNÇU MƏLUMAT BAZASI (manual-players.js)
// ================================================================
//
//  Bu fayl NƏ ÜÇÜNDÜR?
//  Pulsuz API-lər (API-Football, TheSportsDB) hər şeyi əhatə etmir —
//  məsələn cari mövsümün (2025/2026) statistikası, kiçik liqalar,
//  yaxud API-də ümumiyyətlə olmayan oyunçular. Bu faylda əlavə etdiyiniz
//  hər qeyd, axtarış zamanı avtomatik tapılıb göstəriləcək — hətta
//  API-lər həmin oyunçunu tapmasa belə.
//
//  NECƏ ƏLAVƏ EDİLİR? (3 addım)
//  ----------------------------------------------------------------
//  1) Aşağıdakı MANUAL_PLAYERS siyahısına {...} formatında YENİ BİR
//     QEYD əlavə edin (nümunəyə baxın).
//  2) Faylı yadda saxlayın (Ctrl+S).
//  3) futbol.html faylını brauzerdə yeniləyin (F5). Bu qədər —
//     heç bir "build", "compile" və ya server yenidən başlatma
//     lazım deyil, çünki bu sadə JavaScript faylıdır.
//
//  SAHƏLƏRİN İZAHI:
//  ----------------------------------------------------------------
//   name         -> (MÜTLƏQ) Oyunçunun tam adı. Axtarış bu adla
//                    müqayisə olunur (böyük/kiçik hərf fərq etmir).
//   team         -> Hazırkı komandası
//   position     -> Mövqeyi (məs: "Hücumçu", "Sağ qanad", "Qapıçı")
//   age          -> Yaşı (rəqəm, məs: 27)
//   nationality  -> Milliyyəti
//   photo        -> Şəklin tam internet linki (URL). Boş buraxsanız
//                    ikon göstəriləcək.
//   season       -> Hansı mövsümə aiddir (məs: "2025/2026")
//   stats        -> { appearances, goals, assists } — istəyə bağlı,
//                    bilmədiyiniz sahəni silə və ya null qoya bilərsiniz.
//   note         -> Kartın altında görünəcək qısa qeyd (istəyə bağlı)
//  ----------------------------------------------------------------
//
//  QAYDA: Vergülləri (,) unutmayın! Hər qeydin sonunda vergül olmalıdır
//  ki, növbəti qeydlə düzgün ayrılsın (aşağıdakı nümunəyə diqqət edin).
// ================================================================

const MANUAL_PLAYERS = [

  // ---- NÜMUNƏ QEYD (istəsəniz silin, istəsəniz üzərində redaktə edin) ----
  {
    name: "Lionel Messi",
    team: "Inter Miami CF",
    position: "Hücumçu",
    age: 38,
    nationality: "Argentina",
    photo: "https://id.pinterest.com/pin/lionel-messi--609885974571424778/",
    season: "2025/2026",
    stats: { appearances: 24, goals: 19, assists: 14 },
    note: "8 dəfə "Qızıl Top" (Ballon d'Or) qalibi, 2022 Dünya Çempionu"
  },

  // ---- BURADAN AŞAĞI ÖZ QEYDLƏRİNİZİ ƏLAVƏ EDİN ----
 {
  name: "Leandro Andrade",
  team: "Polissya Zhytomyr",
  position: "Right Winger",
  age: 26,
  nationality: "Cape Verde",
  photo: "https://www.playmakerstats.com/player/leandro-andrade/131822",
  Height: "1,76m",
  stats: { appearances: 263, goals: 62, assists: 69 },
  note: "Sürətli cinah yürüşləri və məhsuldar ötürmələri ilə seçilən "Qarabağ"-ın sabiq oyunçusu."
},

];
