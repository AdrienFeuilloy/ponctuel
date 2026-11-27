// Questions du quiz, rangées par partie. Sur chaque ligne : la question, puis la BONNE réponse, puis 3 fausses.
// Le quiz mélange l'ordre des réponses tout seul.
const PARTIES = {
  "Contexte": [
    ["Comment Tony Stark meurt-il dans Endgame ?", "En claquant des doigts avec les Pierres d'Infinité", "Tué par Thanos en duel", "Dans l'explosion du QG des Avengers", "Perdu dans le Royaume quantique"],
    ["Que fait Steve Rogers à la fin d'Endgame ?", "Il reste dans le passé avec Peggy Carter", "Il meurt au combat", "Il part dans l'espace", "Il rejoint la TVA"],
    ["Que surveille la TVA ?", "Les lignes temporelles", "Les Pierres d'Infinité", "Les mutants", "Le Royaume quantique"],
    ["À la fin de la saison 2 de Loki, que devient Loki ?", "Le gardien qui maintient les lignes temporelles", "Le roi d'Asgard", "Un simple agent de la TVA", "Un prisonnier du Vide"],
    ["Qu'est-ce qu'une « variante » ?", "Une autre version d'une même personne, venue d'une autre réalité", "Un clone fabriqué en laboratoire", "Un mutant qui change d'apparence", "Un agent secret de la TVA"],
    ["Qu'est-ce qu'une « incursion » ?", "La collision de deux univers, qui peut les détruire", "Un voyage dans le temps", "Une invasion extraterrestre", "Une variante de Loki"],
    ["Dans quel film les incursions sont-elles présentées ?", "Doctor Strange in the Multiverse of Madness", "Black Widow", "Les Éternels", "Spider-Man: Homecoming"],
    ["À la fin de The Marvels, quel X-Man apparaît ?", "Le Fauve", "Wolverine", "Tornade", "Cyclope"],
    ["Sur quelle Terre se déroule Les 4 Fantastiques : Premiers Pas ?", "Terre-828", "Terre-616", "Terre-199999", "Terre-10005"],
    ["Dans Thunderbolts*, que cache l'astérisque du titre ?", "L'équipe devient les « New Avengers »", "Une scène après le générique", "Le retour d'Iron Man", "Un deuxième film"],
    ["Dans Deadpool & Wolverine, où sont envoyés les personnages effacés ?", "Le Vide", "Le Royaume quantique", "La Latvérie", "Asgard"],
    ["Dans Endgame, que crée un voyage dans le passé ?", "Une nouvelle branche temporelle", "Il efface le présent", "Il réécrit le passé de tout le monde", "Il fait disparaître le voyageur"],
    ["En 2012, dans Endgame, avec quel objet Loki s'échappe-t-il ?", "Le Tesseract", "Le sceptre", "Mjolnir", "L'Æther"],
    ["Qui tue « Celui qui demeure » et libère le multivers ?", "Sylvie", "Loki", "Mobius", "Kang"],
    ["Que font les Dix Anneaux dans la scène après le générique de Shang-Chi ?", "Ils envoient un signal vers une destination inconnue", "Ils se brisent", "Ils disparaissent dans le Vide", "Ils choisissent un nouveau porteur"],
  ],
  "Personnages et capacités": [
    ["De quel pays Doom est-il le souverain ?", "La Latvérie", "La Sokovie", "Le Wakanda", "Genosha"],
    ["Qui a hérité du bouclier de Captain America ?", "Sam Wilson", "Bucky Barnes", "John Walker", "Peter Parker"],
    ["Comment Sue Storm peut-elle devenir invisible ?", "Elle contrôle la lumière", "Elle se téléporte", "Elle change d'apparence", "Elle ralentit le temps"],
    ["Comment surnomme-t-on Ben Grimm ?", "La Chose", "La Torche", "Le Fauve", "Le Colosse"],
    ["Quel membre des Thunderbolts devient Sentry ?", "Bob", "Yelena Belova", "John Walker", "Alexei Shostakov"],
    ["Quelle arme maîtrise Shang-Chi ?", "Les Dix Anneaux", "Le Mjolnir", "L'Œil d'Agamotto", "Le Gant de l'Infini"],
    ["Qui est devenu Black Panther dans Wakanda Forever ?", "Shuri", "M'Baku", "Okoye", "Nakia"],
    ["Comment s'appelle le royaume sous-marin de Namor ?", "Talokan", "Atlantis", "Latvérie", "Madripoor"],
    ["Quel est le pouvoir de Magneto ?", "Contrôler le métal", "La télépathie", "Contrôler la météo", "La téléportation"],
    ["Quel est le pouvoir de Cyclope ?", "Les rafales optiques", "La métamorphose", "L'invisibilité", "La super-vitesse"],
    ["Quel est le pouvoir de Diablo (Nightcrawler) ?", "La téléportation", "La télépathie", "Les rafales optiques", "La métamorphose"],
    ["Quel était l'ancien surnom de Bucky Barnes ?", "Le Soldat de l'hiver", "Le Faucon", "US Agent", "Le Gardien rouge"],
    ["Yelena Belova est la « sœur » de quelle héroïne ?", "Natasha Romanoff (Black Widow)", "Wanda Maximoff", "Carol Danvers", "Hope van Dyne"],
    ["Quel est le pouvoir de Mystique ?", "La métamorphose", "La téléportation", "Contrôler la météo", "Les rafales optiques"],
    ["À quoi sert Cerebro ?", "Amplifier la télépathie de Xavier pour trouver les mutants", "Rendre les mutants humains", "Voyager entre les univers", "Contrôler le métal"],
  ],
};
const melange = t => { for (let i = t.length - 1; i > 0; i--) { const k = Math.floor(Math.random() * (i + 1)); [t[i], t[k]] = [t[k], t[i]]; } return t; };
const QUESTIONS = Object.entries(PARTIES).flatMap(([partie, liste]) => liste.map(([q, bonne, ...fausses]) => {
  const choix = melange([bonne, ...fausses]);
  return { partie, q, choix, bonne: choix.indexOf(bonne) };
}));
console.assert(QUESTIONS.every(x => x.choix.length === 4 && x.bonne >= 0), "questions");

// Les téléphones se relient en direct (WebRTC) ; le service gratuit PeerJS sert juste à les présenter.
const PREFIXE = "ponctuel-doomsday-";
const LETTRES = "ABCD";
const $ = id => document.getElementById(id);
const points = n => n + (n > 1 ? " points" : " point");

function lire(cle) { try { return localStorage.getItem(cle) || ""; } catch { return ""; } }
function ecrire(cle, v) { try { localStorage.setItem(cle, v); } catch {} }

function boutonsReponses(conteneur, choix, onClic) {
  conteneur.textContent = "";
  choix.forEach((texte, i) => {
    const b = document.createElement(onClic ? "button" : "div");
    b.className = "rep";
    const l = document.createElement("span"); l.className = "lettre"; l.textContent = LETTRES[i]; l.setAttribute("aria-hidden", "true");
    const t = document.createElement("span"); t.textContent = texte;
    b.append(l, t);
    if (onClic) { b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-label", LETTRES[i] + " : " + texte); b.onclick = () => onClic(i, b); }
    conteneur.append(b);
  });
}

// ---------- Joueur ----------
const joueur = { id: lire("dd-id") || Math.random().toString(36).slice(2), pseudo: "", n: 0, choix: -1 };
ecrire("dd-id", joueur.id);
$("pseudo").value = lire("dd-pseudo");
$("code").value = new URLSearchParams(location.search).get("code") || "";

$("form-login").addEventListener("submit", e => {
  e.preventDefault();
  const p = $("pseudo").value.trim();
  if (!p) { $("err-pseudo").textContent = "Écris un pseudo pour rejoindre."; $("pseudo").focus(); return; }
  $("err-pseudo").textContent = "";
  const code = $("code").value.trim();
  if (!/^\d{4}$/.test(code)) { $("err-code").textContent = "Le code a 4 chiffres : demande-le au maître du jeu."; $("code").focus(); return; }
  $("err-code").textContent = "";
  joueur.pseudo = p; ecrire("dd-pseudo", p);
  $("moi").textContent = p;
  connecter(code);
});

function connecter(code) {
  const bouton = $("form-login").querySelector("button");
  bouton.disabled = true; bouton.textContent = "Connexion…";
  const echec = msg => {
    bouton.disabled = false; bouton.textContent = "Rejoindre";
    joueur.pseudo = ""; montrer("login");
    $("err-code").textContent = msg;
  };
  if (joueur.peer) joueur.peer.destroy();
  const peer = joueur.peer = new Peer();
  peer.on("error", e => echec(e.type === "peer-unavailable" ? "Partie introuvable : vérifie le code." : "Connexion impossible. Réessaie."));
  peer.on("open", () => {
    const conn = joueur.conn = peer.connect(PREFIXE + code, { reliable: true });
    conn.on("open", () => {
      bouton.disabled = false; bouton.textContent = "Rejoindre";
      montrer("jeu");
      conn.send({ t: "join", id: joueur.id, pseudo: joueur.pseudo });
    });
    conn.on("data", recevoir);
    conn.on("close", () => { joueur.n = 0; echec("Connexion perdue. Appuie sur Rejoindre pour revenir."); });
  });
}

function etat(texte, classe = "") { $("j-etat").textContent = texte; $("j-etat").className = "etat " + classe; }

function recevoir(m) {
  if ("score" in m) $("j-score").textContent = points(m.score);
  if (m.t === "question") {
    if (m.n !== joueur.n) { joueur.choix = m.choix ?? -1; passage($("j-question").closest(".carte")); }
    joueur.n = m.n;
    $("j-num").textContent = m.partie + " · Question " + m.n + " / " + m.total;
    $("j-question").textContent = m.q;
    $("j-reponses").hidden = false;
    boutonsReponses($("j-reponses"), m.reponses, repondre);
    if (joueur.choix >= 0) marquerChoix();
    else etat("Choisis ta réponse.");
  }
  if (m.t === "reveal" && m.n === joueur.n) {
    const btns = $("j-reponses").children;
    for (const b of btns) b.disabled = true;
    btns[m.bonne].classList.add("bonne");
    if (joueur.choix === m.bonne) { etat("✓ Bonne réponse !", "ok"); etincelles(btns[m.bonne], 40, true); }
    else {
      if (joueur.choix >= 0) btns[joueur.choix].classList.add("fausse");
      etat((joueur.choix < 0 ? "Pas de réponse. " : "✗ Raté. ") + "C'était " + LETTRES[m.bonne] + ".", "ko");
    }
  }
  if (m.t === "fin") {
    $("j-num").textContent = "Fin du quiz";
    $("j-question").textContent = m.rang === 1 ? "Tu as gagné !" : "Tu finis " + m.rang + "e sur " + m.nb + ".";
    $("j-reponses").hidden = true;
    document.body.classList.add("fin"); passage($("j-question").closest(".carte"));
    etat("Score final : " + points(m.score) + " sur " + m.total + ".");
  }
}

function repondre(i) {
  joueur.choix = i;
  marquerChoix();
  joueur.conn.send({ t: "answer", id: joueur.id, n: joueur.n, choix: i });
}

function marquerChoix() {
  for (const [i, b] of [...$("j-reponses").children].entries()) {
    b.disabled = true; b.setAttribute("aria-pressed", String(i === joueur.choix));
  }
  etat("Réponse " + LETTRES[joueur.choix] + " envoyée. Attends la correction.");
}

// ---------- Maître du jeu ----------
// phase : "attente" (avant le début), "question", "reveal", "fin"
const partie = { phase: "attente", i: -1, joueurs: new Map(), conns: new Map(), peer: null };

$("action").onclick = () => {
  if (partie.phase === "question") return reveler();
  if (partie.phase === "fin") return;
  if (partie.i + 1 >= QUESTIONS.length) return terminer();
  partie.i++; partie.phase = "question";
  for (const j of partie.joueurs.values()) j.choix = -1;
  for (const id of partie.conns.keys()) envoyerEtat(id);
  afficher();
  passage($("m-carte"));
};

function reveler() {
  partie.phase = "reveal";
  const bonne = QUESTIONS[partie.i].bonne;
  for (const j of partie.joueurs.values()) if (j.choix === bonne) j.score++;
  for (const id of partie.conns.keys()) envoyerEtat(id);
  afficher();
  etincelles($("m-reponses").children[bonne], 40, true);
}

function classement() {
  return [...partie.joueurs.entries()].sort((a, b) => b[1].score - a[1].score);
}

function terminer() {
  partie.phase = "fin";
  for (const id of partie.conns.keys()) envoyerEtat(id);
  afficher();
  document.body.classList.add("fin"); etincelles($("m-titre"), 60, false);
}

// Envoie à un joueur tout ce qu'il doit voir maintenant (sert aussi s'il revient après une coupure).
function envoyerEtat(id) {
  const conn = partie.conns.get(id), j = partie.joueurs.get(id);
  if (!conn || !conn.open || !j) return;
  const Q = QUESTIONS[partie.i];
  if (partie.phase === "question" || partie.phase === "reveal")
    conn.send({ t: "question", n: partie.i + 1, total: QUESTIONS.length, partie: Q.partie, q: Q.q, reponses: Q.choix, choix: j.choix, score: j.score });
  if (partie.phase === "reveal") conn.send({ t: "reveal", n: partie.i + 1, bonne: Q.bonne, score: j.score });
  if (partie.phase === "fin") {
    // ex æquo = même rang
    const rang = 1 + classement().filter(([, x]) => x.score > j.score).length;
    conn.send({ t: "fin", rang, nb: partie.joueurs.size, score: j.score, total: QUESTIONS.length });
  }
}

function afficher() {
  const Q = QUESTIONS[partie.i];
  const enJeu = partie.phase === "question" || partie.phase === "reveal";
  $("m-carte").hidden = !enJeu;
  if (enJeu) {
    $("m-num").textContent = Q.partie + " · Question " + (partie.i + 1) + " / " + QUESTIONS.length;
    $("m-question").textContent = Q.q;
    boutonsReponses($("m-reponses"), Q.choix);
    const reps = $("m-reponses").children;
    reps[Q.bonne].classList.add("bonne"); // le maître du jeu voit toujours la bonne réponse
    for (let i = 0; i < 4; i++) {
      const c = document.createElement("span"); c.className = "compte";
      const n = [...partie.joueurs.values()].filter(j => j.choix === i).length;
      c.textContent = n ? n + " joueur" + (n > 1 ? "s" : "") : "";
      reps[i].append(c);
    }
  }
  const derniere = partie.i + 1 >= QUESTIONS.length;
  $("action").textContent = { attente: "Commencer le quiz", question: "Montrer la réponse", reveal: derniere ? "Voir le classement" : "Question suivante", fin: "Quiz terminé" }[partie.phase];
  $("action").disabled = partie.phase === "fin";

  const liste = partie.phase === "fin" || partie.phase === "reveal" ? classement() : [...partie.joueurs.entries()];
  const nbRep = [...partie.joueurs.values()].filter(j => j.choix >= 0).length;
  $("m-titre").textContent = partie.phase === "fin" ? "Classement final"
    : partie.phase === "question" ? "Réponses (" + nbRep + " / " + partie.joueurs.size + ")"
    : "Joueurs (" + partie.joueurs.size + ")";
  $("m-vide").hidden = partie.joueurs.size > 0;
  const ol = $("joueurs"); ol.textContent = "";
  liste.forEach(([, j], k) => {
    const li = document.createElement("li");
    if (partie.phase === "fin" || partie.phase === "reveal") {
      const r = document.createElement("span"); r.className = "rang";
      r.textContent = 1 + liste.filter(([, x]) => x.score > j.score).length; li.append(r);
    }
    const nom = document.createElement("span"); nom.className = "pseudo"; nom.textContent = j.pseudo; li.append(nom);
    const info = document.createElement("span");
    if (partie.phase === "question") {
      info.className = j.choix >= 0 ? "ok" : "info";
      info.textContent = j.choix >= 0 ? "A répondu : " + LETTRES[j.choix] : "Réfléchit…";
    } else if (partie.phase === "reveal") {
      const juste = j.choix === Q.bonne;
      info.className = juste ? "ok" : "ko";
      info.textContent = j.choix < 0 ? "✗ Pas de réponse" : (juste ? "✓ " : "✗ ") + LETTRES[j.choix];
    } else if (partie.phase === "attente") { info.className = "info"; info.textContent = "Prêt"; }
    li.append(info);
    if (partie.phase !== "attente") {
      const p = document.createElement("span"); p.className = "pts"; p.textContent = points(j.score); li.append(p);
    }
    ol.append(li);
  });
}

// shortcut: recharger la page du maître du jeu crée une nouvelle partie (nouveau code), à garder si ça gêne.
function ouvrirPartie() {
  if (partie.peer) return;
  const code = String(Math.floor(1000 + Math.random() * 9000));
  const peer = partie.peer = new Peer(PREFIXE + code);
  peer.on("open", () => {
    $("m-code").textContent = code;
    $("m-lien").textContent = "Lien direct pour les joueurs : " + location.href.split(/[?#]/)[0] + "?code=" + code + "#joueur";
  });
  peer.on("error", e => {
    if (e.type === "unavailable-id") { partie.peer = null; peer.destroy(); ouvrirPartie(); } // code déjà pris : on en tire un autre
    else if (e.type !== "peer-unavailable") $("m-lien").textContent = "Connexion impossible. Vérifie internet puis recharge la page.";
  });
  peer.on("connection", conn => {
    let id = null;
    conn.on("close", () => { if (id && partie.conns.get(id) === conn) partie.conns.delete(id); });
    conn.on("data", m => {
      if (m.t === "join") {
        id = m.id;
        partie.conns.set(id, conn);
        const j = partie.joueurs.get(id);
        if (j) j.pseudo = m.pseudo; // retour après une coupure : on garde son score
        else partie.joueurs.set(id, { pseudo: m.pseudo, score: 0, choix: -1 });
        envoyerEtat(id); afficher();
      }
      if (m.t === "answer" && partie.phase === "question" && m.n === partie.i + 1) {
        const j = partie.joueurs.get(m.id);
        if (!j || j.choix >= 0) return; // une seule réponse par question
        j.choix = m.choix; afficher();
      }
    });
  });
}

// ---------- Effets : runes, portail, étincelles ----------
// Runes dessinées à la main (trait dans une case de 8 × 16) : aucune police runique n'est sûre d'exister sur les téléphones.
const RUNES = ["M2 0V16M2 3L8 0M2 8L8 5", "M1 16V0L7 4V16", "M2 0V16M2 4L7 8L2 12", "M2 0V16M2 2L8 6M2 7L8 11",
  "M2 16V0L7 4L2 8L7 16", "M7 0L2 8L7 16", "M1 1L7 15M7 1L1 15", "M1 0V16M7 0V16M1 5L7 11", "M4 0V16M4 0L8 3M4 16L0 13",
  "M4 16V0M4 6L0 0M4 6L8 0", "M4 16V0M0 5L4 0L8 5", "M2 0V16L7 12L2 8L7 4Z", "M1 16V0L7 7M7 16V0L1 7"];
for (const g of document.querySelectorAll("[data-runes]")) {
  const [r, n, s] = g.dataset.runes.split(" ").map(Number);
  for (let k = 0; k < n; k++) {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", RUNES[(k * 5) % RUNES.length]);
    p.setAttribute("transform", `rotate(${360 * k / n}) translate(${-4 * s} ${-r - 8 * s}) scale(${s})`);
    g.append(p);
  }
}

const calme = matchMedia("(prefers-reduced-motion: reduce)");
const petit = innerWidth < 600;
const ciel = $("ciel"), ctx = ciel.getContext("2d");
const traits = RUNES.map(d => new Path2D(d));
const runeAuHasard = y => ({ x: Math.random() * innerWidth, y, v: 6 + Math.random() * 10, a: Math.random() * 6.3,
  va: (Math.random() - .5) * .4, t: traits[Math.floor(Math.random() * traits.length)], ph: Math.random() * 6.3, s: 1.4 + Math.random() });
const runes = Array.from({ length: petit ? 7 : 14 }, () => runeAuHasard(Math.random() * innerHeight));
let parts = [], anim = 0, avant = 0;

function taille() {
  const d = Math.min(devicePixelRatio || 1, 2);
  ciel.width = innerWidth * d; ciel.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0);
  colonne = document.querySelector("main").getBoundingClientRect();
}
let colonne;
function boucle(t) {
  anim = 0;
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  if (document.hidden || calme.matches) return;
  const dt = Math.min(.05, (t - avant) / 1000); avant = t;
  ctx.globalCompositeOperation = "lighter"; ctx.lineCap = ctx.lineJoin = "round";
  runes.forEach((r, i) => {
    r.y -= r.v * dt; r.a += r.va * dt;
    if (r.y < -40) runes[i] = runeAuHasard(innerHeight + 40);
    // Le ciel passe devant les cartes (pour les étincelles) : une rune sur la colonne de texte reste à peine visible.
    const lueur = (.5 + .5 * Math.sin(t / 1400 + r.ph)) * (r.x > colonne.left && r.x < colonne.right ? .3 : 1);
    ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.a); ctx.scale(r.s, r.s); ctx.translate(-4, -8);
    ctx.strokeStyle = `rgba(57, 242, 154, ${.05 + .12 * lueur})`; ctx.lineWidth = 4 / r.s; ctx.stroke(r.t);
    ctx.strokeStyle = `rgba(170, 255, 214, ${.1 + .4 * lueur})`; ctx.lineWidth = 1.2 / r.s; ctx.stroke(r.t);
    ctx.restore();
  });
  parts = parts.filter(p => (p.vie -= dt * 1.1) > 0);
  for (const p of parts) {
    p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
    ctx.fillStyle = p.or ? `rgba(240, 205, 130, ${p.vie})` : `rgba(90, 250, 170, ${p.vie})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.5 + 2.5 * p.vie, 0, 6.3); ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";
  anim = requestAnimationFrame(boucle);
}
function lancer() { if (!anim && !document.hidden && !calme.matches) { avant = performance.now(); anim = requestAnimationFrame(boucle); } }

// Gerbe (pluie qui retombe) ou anneau (cercle qui s'ouvre) d'étincelles depuis le centre d'un élément.
function etincelles(el, n, gerbe) {
  if (calme.matches || !el) return;
  const b = el.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2;
  for (let k = 0; k < (petit ? n / 2 : n); k++) {
    const a = gerbe ? Math.random() * 6.3 : 6.3 * k / n, v = gerbe ? 60 + Math.random() * 200 : 240 + Math.random() * 80;
    parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (gerbe ? 160 : 0), g: gerbe ? 420 : 0, vie: 1, or: Math.random() < .25 });
  }
  lancer();
}
const rejouer = (el, c) => { el.classList.remove(c); void el.offsetWidth; el.classList.add(c); };
// Passage d'une question à l'autre : la carte s'ouvre comme un portail. Rien n'est bloqué pendant l'effet.
function passage(carte) { rejouer(carte, "passe"); rejouer($("portail"), "ouvre"); etincelles(carte, 36, false); }

taille();
addEventListener("resize", taille);
document.addEventListener("visibilitychange", lancer);
calme.addEventListener("change", lancer);
lancer();

// ---------- Navigation ----------
const role = () => location.hash.slice(1);
function montrer(id) { for (const s of document.querySelectorAll("main > section")) s.hidden = s.id !== id; }
function route() {
  if (role() === "maitre") { montrer("maitre"); afficher(); ouvrirPartie(); }
  else if (role() === "joueur") { montrer(joueur.pseudo ? "jeu" : "login"); if (!joueur.pseudo) $("pseudo").focus(); }
  else montrer("accueil");
}
addEventListener("hashchange", route);
route();
