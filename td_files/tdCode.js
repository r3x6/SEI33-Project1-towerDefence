"use strict";

function makeSquare(type) {
  const square = document.createElement("div");
  square.className = "square";
  square.id = type;
  document.querySelector("#grounds").append(square);
}

function generateGrounds(len) {
  if (len % 2 !== 0) {
    for (let i = 0; i < len ** 2; i++) {
      if (i < len * Math.ceil(len / 2) && i >= len * Math.floor(len / 2)) {
        if (i === len * Math.floor(len / 2)) {
          makeSquare("endPt");
        } else if (i === len * Math.ceil(len / 2) - 1) {
          makeSquare("startPt");
        } else makeSquare("valley");
      } else {
        makeSquare();
      }
    }
    document.querySelector(".container").style.width = `${len * 52}px`;
  } else {
    alert("Please input an odd number!");
  }
}
generateGrounds(11);

const lit = (e) => {
  if (e.target.className === "square") {
    e.target.classList.add("lit");
    const selector = () => {
      if (e.target.id !== "valley") {
        if (e.target.id !== "selection") {
          e.target.id = "selection";
        } else {
          e.target.id = "";
        }
      }
    };
    document
      .getElementsByClassName("lit")[0]
      .addEventListener("click", selector);
  }
};
const unlit = (e) => {
  if (e.target.className === "square lit") {
    e.target.classList.remove("lit");
  }
};
document.getElementById("grounds").addEventListener("mouseover", lit);
document.getElementById("grounds").addEventListener("mouseout", unlit);

const spawnPt = document.getElementById("startPt").getBoundingClientRect();
const endPt = document.getElementById("endPt").getBoundingClientRect();

const spawnEnemy = () => {
  const enemy = document.createElement("div");
  enemy.className = "enemy";
  const enemyHp = document.createElement("div");
  enemyHp.className = "enemyHp";
  enemyHp.id = "enemyHp";
  const enemyLostHp = document.createElement("div");
  enemyLostHp.className = "enemyLostHp";
  enemyLostHp.id = "enemyLostHp";
  const enemySprite = document.createElement("div");
  enemySprite.className = "enemySprite";
  enemySprite.id = "enemySprite";
  enemy.setAttribute("hp", 100);
  enemy.setAttribute("lostHp", 0);

  enemy.append(enemyHp);
  enemy.append(enemyLostHp);
  enemy.append(enemySprite);
  enemy.className = "mob";
  enemy.id = "mob";
  enemy.style.top = `${spawnPt.y + spawnPt.height / 2 - 14}px`;
  enemy.style.left = `${spawnPt.x + spawnPt.width / 2 - 10}px`;

  document.body.append(enemy);

  const enemyMovement = () => {
    if (document.getElementById("mob") !== null) {
      const mob = document.getElementById("mob");
      const mobLocation = mob.getBoundingClientRect();
      const step = 1;
      if (mobLocation.x > endPt.x) {
        mob.style.left = `${mobLocation.x + window.scrollX - step}px`;
        console.log();
      } else {
        mob.remove();
        clearInterval(enemyMoveInterval);
      }
    }
  };
  const enemyMoveInterval = setInterval(enemyMovement, 50);
};
document.getElementById("start").addEventListener("click", spawnEnemy);

const buildTower1 = () => {
  const range = 3;
  const selectedTile = document.getElementById("selection");
  selectedTile.classList.add("tower");
  selectedTile.style.backgroundImage = "url('images/towerImg.jpg')";
  const selectedPosition = selectedTile.getBoundingClientRect();

  const towerRange = document.createElement("div");
  selectedTile.append(towerRange);
  towerRange.className = "towerRange";
  towerRange.style.height = `${range * 52 * 2 + 52 - 4}px`;
  towerRange.style.width = `${range * 52 * 2 + 52 - 4}px`;
  towerRange.style.borderRadius = `${(range * 52 * 2 + 52 - 4) / 2}px`;
  towerRange.style.zIndex = -1;

  const showRange = () => {
    towerRange.style.zIndex = 0;
  };
  const hideRange = () => {
    towerRange.style.zIndex = -1;
  };
  selectedTile.addEventListener("mouseenter", showRange);
  selectedTile.addEventListener("mouseleave", hideRange);

  const shoot = () => {
    const projectile = document.createElement("div");
    selectedTile.append(projectile);
    projectile.className = "projectile";
    projectile.style.top = selectedPosition.y + 26;
    projectile.style.left = selectedPosition.x + 26;

    const projectileDmg = 10;
    let moveY = 5;
    let moveX = 5;

    const damageMob = () => {
      const mobHit = document.getElementById("mob");
      const mobHitHp = document.getElementById("enemyHp");
      const mobHitLostHp = document.getElementById("enemyLostHp");

      const currentHp = parseInt(mobHit.getAttribute("hp"));
      const currentLostHp = parseInt(mobHit.getAttribute("lostHp"));
      const maxHp = currentHp + currentLostHp;

      const newHp = currentHp - projectileDmg;
      if (newHp <= 0) {
        projectile.remove();
        mobHit.remove();
      }
      mobHit.setAttribute("hp", newHp);
      const newLostHp = currentLostHp + projectileDmg;
      mobHit.setAttribute("lostHp", newLostHp);

      mobHitHp.style.width = `${(newHp / maxHp) * 22}px`;
      mobHitLostHp.style.width = `${(newLostHp / maxHp) * 22}px`;
    };
    damageMob();

    const projectileMotion = () => {
      if (document.getElementById("enemySprite") !== null) {
        const projectileRadius = projectile.getBoundingClientRect().width / 2;
        const projectileLocation = {
          x: projectile.getBoundingClientRect().x,
          y: projectile.getBoundingClientRect().y,
        };
        const mobRadius =
          document.getElementById("enemySprite").getBoundingClientRect().width /
          2;
        const mobLocation = {
          x: document.getElementById("enemySprite").getBoundingClientRect().x,
          y: document.getElementById("enemySprite").getBoundingClientRect().y,
        };
        const dx =
          projectileLocation.x + projectileRadius - (mobLocation.x + mobRadius);
        const dy =
          projectileLocation.y + projectileRadius - (mobLocation.y + mobRadius);
        const dist = Math.sqrt(dx ** 2 + dy ** 2);

        if (dist > mobRadius) {
          if (projectileLocation.y < mobLocation.y) {
            projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
            moveY += Math.abs(dy / dx);
          } else {
            projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
            moveY -= Math.abs(dy / dx);
          }

          if (projectileLocation.x < mobLocation.x) {
            projectile.style.transform = `translate(${moveX}px, ${moveY}px)`;
            moveX += Math.abs(dx / dy);
          } else {
            projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
            moveX -= Math.abs(dx / dy);
          }
        } else {
          projectile.remove();
        }
      } else {
        clearInterval(movingProjectile);
        projectile.remove();
      }
    };
    const movingProjectile = setInterval(projectileMotion, 1);
  };

  const withinRange = () => {
    if (document.getElementById("enemySprite") !== null) {
      const towerRadius = (range * 52 * 2 + 52 - 4) / 2;
      const mobRadius = document.getElementById("enemySprite").style.width / 2;
      const towerCentre = {
        x: towerRange.getBoundingClientRect().x,
        y: towerRange.getBoundingClientRect().y,
      };
      const mobLocation = {
        x: document.getElementById("enemySprite").getBoundingClientRect().x,
        y: document.getElementById("enemySprite").getBoundingClientRect().y,
      };
      const dx = towerCentre.x + towerRadius - (mobLocation.x + mobRadius);
      const dy = towerCentre.y + towerRadius - (mobLocation.y + mobRadius);
      const dist = Math.sqrt(dx ** 2 + dy ** 2);

      if (
        dist <= towerRadius + mobRadius &&
        document.getElementById("enemySprite") !== null
      ) {
        shoot();
      }
    }
  };
  const attackInterval = setInterval(withinRange, 500);
};
document.getElementById("build").addEventListener("click", buildTower1);
