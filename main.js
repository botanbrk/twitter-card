//console.log('bağlantı')

const placeholder = document.querySelector(".placeholder");
//console.log(placeholder)

const editableInput = document.querySelector(".editable");
//console.log(editableInput)

const counter = document.getElementById("counter");
//console.log(counter)
const button = document.querySelector(".button");
//console.log(button)
const readonly = document.querySelector(".readonly");
//console.log(readonly)
const tweetsContainer = document.querySelector(".tweetsContainer");

//Toplam karakter limiti
const tweetLimit = 5;
let tweets = [];
//Tweet İçerik tutulur
let tweetContent;
let newTweet;

//Placeholdera tıklayınca soluklaştırma
editableInput.addEventListener("click", () => {
    placeholder.style.opacity = "0.5 ";
});

//placeholder rdan focusu çekince eski haline geitrme
editableInput.onblur = () => {
    placeholder.style.opacity = "1";
};

//klavye her basıldığna placeholser görünümü yok etme
editableInput.onkeypress = (e) => {
    placeholder.style.display = "none";

    //console.log(e.target.innerText)
    let inputContent = e.target.innerText;
    validateTweet(inputContent);
};

//klavyedeki tuştan elimizi çekince görünümü yok etme
editableInput.onkeyup = (e) => {
    placeholder.style.display = "none";
    let inputContent = e.target.innerText;
    validateTweet(inputContent);
};

const validateTweet = (tweet) => {
    //console.log(tweet)
    tweetContent = tweet;
    //console.log('asdnh',tweetContent)

    //tweet uzunluğu hesaplar
    let tweetLenght = tweet.length;

    //aşılan limit tespiti
    let limit = tweetLimit - tweetLenght;
    //console.log(tweetLenght)

    //Kalan karakter bilgisini html aktarıyor
    counter.innerText = limit;

    //Tweet olup olmaıdğı yani inputun boş olup olmamam durumu
    if (tweetLenght <= 0) {
        //Eğer Tweet yoksa

        //İnput boşsa placeholder göster
        placeholder.style.display = "block";
        //Tweet butpnunu pasif yap
        button.classList.remove("active");
        //Sayacı gizle
        counter.style.display = "none";
    } else {
        //Eğer Tweet varsa

        //Placeholder yok et
        placeholder.style.display = "none";

        //Sayacı aktif hale geitr
        counter.style.display = "block";

        //Butonu aktif hale getriyor
        button.classList.add("active");
    }

    //Karakter limitinin aşılıp aşılmadığı kontrol ediliyor

    if (limit < 0) {
        //Limiti aşma durmunda

        //sayacın rengini kırmızı yap
        counter.style.color = "red";

        //butonu pasif hale geitrme
        button.classList.remove("active");
        //Girilen tweetten limiti aşan karakteri alma
        let overTweet = tweet.substr(tweetLimit, tweetLenght);
        //console.log(overTweet)

        //HTML de taşan tweeti karakterini göstermek ve arka planını kırmızı yapmak için spana atıyz
        let overTweetElement = `<span class='overText'>${overTweet}</span>`;
        //limit aşmayan tweet ve aşan akarkterleri birleştiirk
        newTweet = tweet.substr(0, tweetLimit) + overTweetElement;

        //newtweet i html de göster mek için tanımladığımız divi görünür hale getirdik
        readonly.style.zIndex = "1";
    } else {
        //Limit aşılmadıysa
        //sayaç rengi normal
        counter.style.color = "#333";

        //limiti aşmıyosa gösterme
        readonly.style.zIndex = "-5";
    }

    readonly.innerHTML = newTweet;
};

button.addEventListener("click", () => {

    tweetsContainer.innerHTML = "";
    editableInput.innerText = "";
    tweets.push(tweetContent);
    console.log(tweets);
    //console.log(tweetConten)

    tweets.map((tweet) => {
        let card = document.createElement("div");

        card.innerHTML = `
        <div class="tweetCard">
        <img src="https://images.unsplash.com/photo-1693803817885-e6643dcc2242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=400&q=60" alt="">
<div>
    <h3>Udemig</h3>
    <p >${tweet}</p>


</div>
    </div>
        
        `;

        tweetsContainer.appendChild(card);
    });
});