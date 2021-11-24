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
      if (
        e.target.id !== "valley" &&
        e.target.id !== "startPt" &&
        e.target.id !== "endPt"
      ) {
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

let totalEnemyCount = 0;

const spawnEnemy = () => {
  totalEnemyCount += 1;
  const spawnPt = document.getElementById("startPt").getBoundingClientRect();

  const enemy = document.createElement("div");
  enemy.className = "mob";
  enemy.id = `mob${totalEnemyCount}`;
  const enemyHp = document.createElement("div");
  enemyHp.className = "enemyHp";
  const enemyLostHp = document.createElement("div");
  enemyLostHp.className = "enemyLostHp";
  const enemySprite = document.createElement("div");
  enemySprite.className = "enemySprite";
  enemy.setAttribute("hp", 200);
  enemy.setAttribute("lostHp", 0);

  enemy.append(enemyHp);
  enemy.append(enemyLostHp);
  enemy.append(enemySprite);

  enemy.style.top = `${spawnPt.y + spawnPt.height / 2 + window.scrollY - 14}px`;
  enemy.style.left = `${spawnPt.x + spawnPt.width / 2 + window.scrollX - 10}px`;

  document.body.append(enemy);

  const enemyMovement = () => {
    const endPt = document.getElementById("endPt").getBoundingClientRect();

    if (enemy !== null) {
      const mobLocation = enemy.getBoundingClientRect();
      const step = 1;
      if (mobLocation.left + window.scrollX > endPt.left + window.scrollX) {
        enemy.style.left = `${mobLocation.x + window.scrollX - step}px`;
        console.log();
      } else {
        enemy.remove();
        clearInterval(enemyMoveInterval);
      }
    }
  };
  const enemyMoveInterval = setInterval(enemyMovement, 60);
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

  const findTarget = () => {
    const towerRadius = (range * 52 * 2 + 52 - 4) / 2;
    const allEnemyList = document.getElementsByClassName("mob");

    if (allEnemyList.length === 0) {
      return null;
    } else {
      let enemyList = [];

      for (let enemy of allEnemyList) {
        const enemyRect = enemy.children[2].getBoundingClientRect();
        const enemyRadius = enemyRect.width / 2;

        const towerCentre = {
          x: towerRange.getBoundingClientRect().x,
          y: towerRange.getBoundingClientRect().y,
        };
        const enemyLocation = {
          x: enemyRect.x,
          y: enemyRect.y,
        };
        const dx =
          towerCentre.x + towerRadius - (enemyLocation.x + enemyRadius);
        const dy =
          towerCentre.y + towerRadius - (enemyLocation.y + enemyRadius);
        const dist = Math.sqrt(dx ** 2 + dy ** 2);
        if (dist <= towerRadius + enemyRadius) {
          const potentialTarget = { id: `${enemy.id}`, dist: `${dist}` };
          enemyList.push(potentialTarget);
        }
      }
      if (enemyList.length === 0) {
        return null;
      } else {
        const target = document.getElementById(
          enemyList.sort((a, b) => (a.dist < b.dist ? a : b))[0].id
        );
        return target;
      }
    }
  };

  const shoot = () => {
    const projectile = document.createElement("div");
    selectedTile.append(projectile);
    projectile.className = "projectile";
    projectile.style.top = selectedPosition.y + 26;
    projectile.style.left = selectedPosition.x + 26;

    const projectileDmg = 10;
    let moveY = 5;
    let moveX = 5;

    const projectileMotion = () => {
      if (findTarget() !== null) {
        const projectileRadius = projectile.getBoundingClientRect().width / 2;
        const projectileLocation = {
          x: projectile.getBoundingClientRect().x,
          y: projectile.getBoundingClientRect().y,
        };
        const mobRadius =
          findTarget().children[2].getBoundingClientRect().width / 2;
        const mobLocation = {
          x: findTarget().children[2].getBoundingClientRect().x,
          y: findTarget().children[2].getBoundingClientRect().y,
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

    const damageMob = () => {
      const mobHit = findTarget();
      const mobHitHp = findTarget().children[0];
      const mobHitLostHp = findTarget().children[1];

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
  };

  const withinRange = () => {
    if (findTarget() !== null) {
      const towerRadius = (range * 52 * 2 + 52 - 4) / 2;
      const mobRadius = findTarget().children[2].style.width / 2;
      const towerCentre = {
        x: towerRange.getBoundingClientRect().x,
        y: towerRange.getBoundingClientRect().y,
      };
      const mobLocation = {
        x: findTarget().children[2].getBoundingClientRect().x,
        y: findTarget().children[2].getBoundingClientRect().y,
      };
      const dx = towerCentre.x + towerRadius - (mobLocation.x + mobRadius);
      const dy = towerCentre.y + towerRadius - (mobLocation.y + mobRadius);
      const dist = Math.sqrt(dx ** 2 + dy ** 2);

      if (dist <= towerRadius + mobRadius && findTarget() !== null) {
        shoot();
      }
    }
  };
  setInterval(withinRange, 500);
  selectedTile.id = "";
};
document.getElementById("build").addEventListener("click", buildTower1);
