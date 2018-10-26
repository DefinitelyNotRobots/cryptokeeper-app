<template>
  <main>
    <h2>Team Big Cats</h2>
    <li class="main-team"> <a href="https://github.com/DefinitelyNotRobots">Check us out on Github</a></li>
    <ul class="team-section">
      <li class="profile-section">
        <ul>
          <li class="profile">
            <img src="../assets/profiles/mike.jpeg">
            <a href="https://github.com/MikeBLambert">Mike Lambert</a>
            <p>Mike is a former professional BMXer. In his spare time, fights crime in a Batman costume.</p>
          </li>
          <li class="profile">
              <img src="../assets/profiles/claire.png">
              <a href="https://github.com/R-i-t-a">Claire</a>
              <p>Claire has a flair for fashion; you will never catch her wearing a polo. Furthermore, her culinary exploits are locally-renowned.</p>
          </li>
          <li class="profile">
            <img src="../assets/profiles/jack.png">
            <a href="https://github.com/miloofcroton">Jack Toumey</a>
            <p>Jack never met a cookie that he didn't like, but if he did, he would probably say it was 'crumby'.</p>
          </li>
        </ul>
      </li>
    </ul>

    <p>
      
    </p>


  </main>
</template>

<script>

export default {

};

</script>

<style scoped>

.team-section {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
}
.profile a, .main-team a {
  display: block;
  color: black;
  font-size: 28px;
  text-shadow: 1px 1px 1px black;
}
.team-section, .main-team, .profile-section, .profile {
  border: none;
}
.profile {
  margin: 10px;
}
.profile img {
  width: 75%;
}
.profile p {
  font-size: 18;
  margin: 0px;
  width: 100%;
}

li {
  list-style: none;
}


main {
  color: black;
}

h2, p {
  text-shadow: 1px 1px 1px black;
}

h2 {
  margin-top: 5%;
  font-size: 36px;
}

p.center {
  text-align: center;
}

p {
  font-size: 24px;
  text-align: left;
  width: 45%;
  padding: 10px;
  margin: 10px auto;
}

@media screen and (max-width: 480px) {

    p {
    width: 50%;
    }

    h2 {
      margin: 5% 10%;
    }
    
}

</style>
