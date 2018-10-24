<template>
  <main>
    <h2>Team Big Cats</h2>
    <ul class="team-section">
      <li class="main-team"> <a href="https://github.com/DefinitelyNotRobots">Check us out on Github</a></li>
      <li class="profile-section">
        <ul>
          <li class="profile">
            <img src="../assets/profiles/mike.jpeg">
            <a href="https://github.com/MikeBLambert">Mike Lambert</a>
            <p>[enter bio]</p>
          </li>
          <li class="profile">
              <img src="../assets/profiles/claire.png">
              <a href="https://github.com/R-i-t-a">Claire</a>
              <p>[enter bio]</p>
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

#team-pic {
  width: 75%;
}

.team-section {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
}
.profile a, .main-team a {
  display: block;
  color: white;
  font-size: 28px;
  text-shadow: 3px 3px 3px black;
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



main {
  color: white;
}

h2, p {
  text-shadow: 3px 3px 3px black;
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
