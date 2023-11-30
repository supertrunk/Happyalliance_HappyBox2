class Rank {
    constructor() {
        this.NickName = '';
        this.Score = 0;
        this.HappyBox = 0;
    }
}

class FirebaseHandler {
    constructor() {
        this.path = "https://happybox-c1da7-default-rtdb.firebaseio.com";
    }

    saveDataRank(rank) {
        const jsonData = JSON.stringify(rank);
        fetch(`${this.path}/Ranking/${rank.NickName}.json`, {
            method: 'PUT',
            body: jsonData,
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    async setDataTest() {
        let count = 0;
        while (count < 100) {
            count++;
            const rank = new Rank();
            rank.NickName = `SuperTrunk${200 + count}`;
            rank.Score = Math.floor(Math.random() * 500) + 1;
            const jsonData = JSON.stringify(rank);

            await fetch(`${this.path}/Ranking/${rank.NickName}.json`, {
                method: 'PUT',
                body: jsonData,
                headers: { 'Content-Type': 'application/json' }
            });

            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }

    readDataRank(callback) {
        fetch(`${this.path}/Ranking.json`)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error:', error));
    }
}

class RankingResult {
    constructor(){
        this.Rank = 0;
        this.HappyBoxCount = 0;
        this.UserCount = 0;
    }
}