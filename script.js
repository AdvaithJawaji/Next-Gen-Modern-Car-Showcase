let currentCategory = 'all';
let compareList = [];
let currentUser = null;
let role = 'user';
let users = JSON.parse(localStorage.getItem('users')) || [];
let editingId = null;

let defaultCars = [
    {id:1, name:"Mercedes AMG G63", price:35000000, year:2024, fuel:"Petrol", kms:14000, category:"premium", img:"https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600", brand:"Mercedes", description:"Luxury SUV"},
    {id:2, name:"Lamborghini Urus S", price:42000000, year:2023, fuel:"Petrol", kms:12000, category:"sport", img:"https://editorial.pxcrush.net/carsales/general/editorial/2022-lamborghini-urus-s-02160.jpg", brand:"Lamborghini", description:"High-performance SUV"},
    {id:3, name:"Porsche 911 GT3", price:28000000, year:2025, fuel:"Petrol", kms:6000, category:"sport", img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600", brand:"Porsche", description:"Sports car"},
    {id:4, name:"Tesla Model S Plaid", price:12000000, year:2024, fuel:"Electric", kms:8950, category:"sport", img:"https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=600", brand:"Tesla", description:"Electric sedan"},
    {id:5, name:"Range Rover SV", price:41000000, year:2024, fuel:"Diesel", kms:45000, category:"premium", img:"https://images.pistonheads.com/nimg/48206/blobid0.jpg", brand:"Land Rover", description:"Luxury SUV"},
    {id:6, name:"Ferrari 296 GTB", price:54000000, year:2025, fuel:"Hybrid", kms:2900, category:"sport", img:"https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=600", brand:"Ferrari", description:"Supercar"},
    {id:7, name:"BMW M8 Competition", price:24000000, year:2023, fuel:"Petrol", kms:32000, category:"sport", img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600", brand:"BMW", description:"High-performance coupe"},
    {id:8, name:"Audi RS e-tron GT", price:19000000, year:2025, fuel:"Electric", kms:5000, category:"sport", img:"https://media.audiusa.com/assets/images/hero/14663-0k2a6238.jpg", brand:"Audi", description:"Electric sports sedan"},
    {id:9, name:"Rolls Royce Ghost", price:72000000, year:2025, fuel:"Petrol", kms:1100, category:"premium", img:"https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/ghost-ext-sii/discover/page-components/D-EXP-OVERHEAD-GESII-DISCOVER.jpg/jcr:content/renditions/cq5dam.web.1920.webp", brand:"Rolls Royce", description:"Ultra-luxury sedan"},
    {id:10, name:"Bentley Continental GT", price:48000000, year:2025, fuel:"Petrol", kms:2800, category:"premium", img:"https://www.yankodesign.com/images/design_news/2024/09/bentley-continental-gt-speed-review/2025-Bentley-Continental-GT_yankodesign_review_hero.jpg", brand:"Bentley", description:"Grand tourer"},
    {id:11, name:"Aston Martin DB12", price:45000000, year:2025, fuel:"Petrol", kms:10000, category:"sport", img:"https://cdn.inventoryrsc.com/480986036_6940a1da4f214b3aeee4946d.jpg", brand:"Aston Martin", description:"Luxury sports car"},
    {id:20, name:"Mini Cooper Country Man", price:6000000, year:2023, fuel:"Diesel", kms:20000, category:"economy", img:"https://stimg.cardekho.com/images/carexteriorimages/630x420/Mini/Cooper-Convertible/5182/1647857852543/front-left-side-47.jpg?tr=w-664", brand:"Mini", description:"Compact SUV"},
    {id:21, name:"Toyota Legender", price:4600000, year:2025, fuel:"Diesel", kms:45000, category:"economy", img:"https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/137767/fortuner-legender-exterior-front-view.jpeg?isig=0&q=80", brand:"Toyota", description:"SUV"},
    {id:22, name:"Mg Hector", price:1700000, year:2024, fuel:"Diesel", kms:60000, category:"economy", img:"https://imgd.aeplcdn.com/640X480/vimages/202603/4417357_107135_1_1772352396291.jpg?qp=80&fit=true", brand:"MG", description:"SUV"},
    {id:23, name:"Tata Harrier", price:2400000, year:2025, fuel:"Diesel", kms:34000, category:"economy", img:"https://images.financialexpressdigital.com/2025/02/harrier-stealth.jpg", brand:"Tata", description:"SUV"},
    {id:24, name:"Hyundai Creta", price:1650000, year:2024, fuel:"Petrol", kms:60000, category:"economy", img:"https://images.financialexpressdigital.com/2024/01/Hyundai-Creta-review.jpg", brand:"Hyundai", description:"SUV"},
    {id:25, name:"Kia Seltos", price:1600000, year:2024, fuel:"Diesel", kms:62000, category:"economy", img:"https://img-ik.cars.co.za/news-site-za/images/2024/04/2024-Kia-Seltos-9.jpg?impolicy=website&width=400&height=225", brand:"Kia", description:"SUV"},
    {id:26, name:"Grand Vitara", price:1500000, year:2023, fuel:"Diesel", kms:71000, category:"economy", img:"https://gaadiwaadi.com/wp-content/uploads/2022/09/maruti-grand-vitara-8-740x462.jpg", brand:"Maruti Suzuki", description:"SUV"},
    {id:27, name:"Maruthi S-cross", price:900000, year:2023, fuel:"Petrol", kms:85000, category:"economy", img:"https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/S-Cross/9161/1644830515011/front-left-side-47.jpg", brand:"Maruti Suzuki", description:"SUV"},
    {id:28, name:"Hyundai i20", price:750000, year:2024, fuel:"Petrol", kms:66000, category:"economy", img:"https://cdn-s3.autocarindia.com/hyundai/i20/_AAB7201.JPG?w=640", brand:"Hyundai", description:"Hatchback"},
    {id:29, name:"Maruthi Baleno", price:600000, year:2022, fuel:"Diesel", kms:102000, category:"economy", img:"https://images.autox.com/uploads/2022/03/2022-Maruti-Suzuki-Baleno-review1.webp", brand:"Maruti Suzuki", description:"Hatchback"},
    {id:30, name:"Toyota Innova", price:1900000, year:2023, fuel:"Diesel", kms:79000, category:"economy", img:"https://www.jazzycars.in/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-16-at-4.04.55-PM-1-798x466.jpeg", brand:"Toyota", description:"MPV"},
    {id:31, name:"Innova Hycross", price:2900000, year:2025, fuel:"Diesel(Hybrid)", kms:44000, category:"economy", img:"https://imgd.aeplcdn.com/664x374/n/cw/ec/115025/innova-hycross-exterior-right-front-three-quarter-72.jpeg?isig=0&q=80", brand:"Toyota", description:"MPV"},
    {id:32, name:"Hyundai Alcazar", price:1800000, year:2024, fuel:"Petrol", kms:91000, category:"economy", img:"https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/157825/alcazar-facelift-exterior-left-front-three-quarter-3.jpeg?isig=0&q=80", brand:"Hyundai", description:"SUV"},
    {id:33, name:"Hyundai Venue", price:1100000, year:2023, fuel:"Diesel", kms:98000, category:"economy", img:"https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2022-hyundai-venue-facelift-01%20(1)_0.jpg", brand:"Hyundai", description:"SUV"},
    {id:34, name:"Kia Sonet", price:1000000, year:2024, fuel:"Petrol", kms:101000, category:"economy", img:"http://images.overdrive.in/wp-content/uploads/2024/01/2023-Kia-Sonet-122-900x506.jpg?impolicy=website&width=400&height=225", brand:"Kia", description:"SUV"},
    {id:35, name:"Kia Carnival", price:2900000, year:2024, fuel:"Diesel", kms:76000, category:"economy", img:"https://imgd.aeplcdn.com/642x361/n/cw/ec/187347/kia-new-carnival-left-front-three-quarter0.jpeg?isig=0&q=80", brand:"Kia", description:"MPV"},
    {id:36, name:"Tata Nexon", price:1900000, year:2025, fuel:"Electric", kms:91000, category:"economy", img:"https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2023_tata_nexon_ev_facelift_exterior_01.jpg", brand:"Tata", description:"SUV"},
    {id:37, name:"Mg Astor", price:2500000, year:2023, fuel:"Electric", kms:96500, category:"economy", img:"https://images.news18.com/ibnlive/uploads/2022/03/2022-mg-zs-ev-review-164872076316x9.jpg?impolicy=website&width=400&height=225", brand:"MG", description:"SUV"},
    {id:38, name:"Mg Gloster", price:3100000, year:2021, fuel:"Diesel", kms:99000, category:"economy", img:"https://imgd.aeplcdn.com/642x361/n/cw/ec/100023/right-front-three-quarter0.jpeg?isig=0&q=80", brand:"MG", description:"SUV"},
    {id:39, name:"Mahindra Thar", price:1450000, year:2023, fuel:"Petrol", kms:55000, category:"economy", img:"https://www.team-bhp.com/forum/attachments/test-drives-initial-ownership-reports/2471346d1688450959t-my-2023-mahindra-thar-petrol-4x4-ownership-review-dusty-reborn-4x4-tharsolodsc01.jpg", brand:"Mahindra", description:"SUV"},
    {id:40, name:"Mahindra XUV(700)", price:2200000, year:2022, fuel:"Diesel", kms:94000, category:"economy", img:"https://media.zigcdn.com/media/model/2025/Nov/model-extimg-981834496_600x400.jpg", brand:"Mahindra", description:"SUV"},
    {id:41, name:"Toyota Fortuner", price:2900000, year:2022, fuel:"Diesel", kms:101000, category:"economy", img:"https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Fortuner/10904/1755075007369/grille-97.jpg", brand:"Toyota", description:"SUV"},
    {id:42, name:"Mahindra Scorpio N", price:1650000, year:2022, fuel:"Petrol", kms:101000, category:"economy", img:"https://images.financialexpressdigital.com/2022/06/2022-Mahindra-Scorpio-N-9.jpg", brand:"Mahindra", description:"SUV"},
    {id:43, name:"Thar Roxx", price:1800000, year:2024, fuel:"Diesel", kms:24000, category:"economy", img:"https://www.evoindia.com/evoindia/2024-08-16/fwnmw008/Roxx-1.jpg", brand:"Mahindra", description:"SUV"},
    {id:44, name:"Mahindra BE-6", price:2750000, year:2025, fuel:"Electric", kms:41000, category:"economy", img:"https://www.financialexpress.com/auto/images/model-media-1732876255899.webp?w=480", brand:"Mahindra", description:"SUV"},
    {id:45, name:"Honda Elevate", price:1500000, year:2023, fuel:"Petrol", kms:96500, category:"economy", img:"https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/Elevate/12099/1758790837363/front-view-118.jpg", brand:"Honda", description:"SUV"},
    {id:46, name:"Honda City", price:1200000, year:2022, fuel:"Petrol", kms:102000, category:"economy", img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhA986iF5JtX2qjn1f5XB8XRsu19AlSmaYo7ex4HFs6YQqJfrijyjG6wvd4vyy8nxSjibbFIF7zQHD9CQ1_x7SXhAdMEgjWuPYxaForDGgycj3tiqeidIAdRqLOztFXpF_rXaytQypYbDEvautyHj5YadMRDHr79VkpvX2Ib6YA0VUcBLrNpAC7aunPrQ/s1024/2022_honda_city_15s.JPG", brand:"Honda", description:"Sedan"},
    {id:47, name:"Hyundai Verna", price:1500000, year:2023, fuel:"Petrol", kms:88000, category:"economy", img:"https://imgd.aeplcdn.com/664x374/n/cw/ec/121943/verna-facelift-exterior-right-front-three-quarter-100.jpeg?isig=0&q=80", brand:"Hyundai", description:"Sedan"},
    {id:48, name:"Swift Dzire", price:900000, year:2024, fuel:"Diesel", kms:65000, category:"economy", img:"https://c.ndtvimg.com/2024-11/jv0eghso_dzire_625x300_05_November_24.jpg?impolicy=website&width=400&height=225", brand:"Maruti Suzuki", description:"Sedan"},
    {id:49, name:"Nissan Magnite", price:700000, year:2023, fuel:"Petrol", kms:82000, category:"economy", img:"https://imgd.aeplcdn.com/640X480/vimages/202601/4344576_158890_1_1768635219883.jpg?qp=80&fit=true", brand:"Nissan", description:"SUV"},
    {id:50, name:"Honda Amaze", price:600000, year:2023, fuel:"Petrol", kms:104000, category:"economy", img:"https://img.autocarindia.com/ExtraImages/20230113063922_DSC_7272.jpg?w=728&q=75", brand:"Honda", description:"Sedan"},
    {id:51, name:"Maruthi Swift", price:701000, year:2023, fuel:"Diesel", kms:94000, category:"economy", img:"https://i0.wp.com/bestsellingcarsblog.com/wp-content/uploads/2022/06/Suzuki-Swift-South-Africa-May-2022.jpeg?w=600&ssl=1", brand:"Maruti Suzuki", description:"Hatchback"},
    {id:52, name:"Skoda Kushaiq", price:1200000, year:2023, fuel:"Diesel", kms:101000, category:"economy", img:"https://www.indiacarnews.com/wp-content/uploads/2021/06/Skoda-Kushaq-Prices.jpg", brand:"Skoda", description:"SUV"},
    {id:53, name:"Skoda Slavia", price:1400000, year:2023, fuel:"Diesel", kms:98000, category:"economy", img:"https://imgd-ct.aeplcdn.com/640X480/vimages/202602/4401043_7705_1_1771513631582.jpg?qp=80&fit=true", brand:"Skoda", description:"Sedan"},
    {id:54, name:"Volkswagen Virtus", price:1400000, year:2023, fuel:"Diesel", kms:96500, category:"economy", img:"https://www.team-bhp.com/forum/attachments/official-new-car-reviews/2414217d1687193162t-volkswagen-virtus-review-volkswagenvirtusexclusive2024.jpg", brand:"Volkswagen", description:"Sedan"},
    {id:55, name:"Volkswagen Polo GT", price:700000, year:2018, fuel:"Petrol", kms:110000, category:"economy", img:"https://polo.blue/_spoko/fastest-vw-polo-6r-2-0-tsi-awd-dq250-in-india-02-front-1200x675_ZdJhXp.webp", brand:"Volkswagen", description:"Hatchback"},
    {id:56, name:"Maruthi Ertiga", price:900000, year:2022, fuel:"Diesel", kms:120000, category:"economy", img:"https://cdn-s3.autocarindia.com/Maruti-Suzuki/Ertiga/_DSC0504.JPG?w=640", brand:"Maruti Suzuki", description:"MPV"},
    {id:57, name:"Kia Carens", price:1250000, year:2023, fuel:"Diesel", kms:98000, category:"economy", img:"https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/144163/carens-exterior-front-view-2.jpeg?isig=0&q=80", brand:"Kia", description:"MPV"},
    {id:58, name:"Ford Eco-Sport", price:600000, year:2018, fuel:"Diesel", kms:135000, category:"economy", img:"https://static.toiimg.com/thumb/msid-64415266,imgsize-280815,width-400,resizemode-4/ecosport-s-1.jpg", brand:"Ford", description:"SUV"},
    {id:59, name:"Ford Endavour", price:2500000, year:2018, fuel:"Diesel", kms:120000, category:"economy", img:"https://i0.wp.com/realautoreviews.in/wp-content/uploads/2021/04/2021-Ford-Endeavour-2.0-4WD-review.jpg?resize=768%2C512&ssl=1", brand:"Ford", description:"SUV"},
    {id:60, name:"Maruthi Ciaz", price:950000, year:2023, fuel:"Petrol", kms:96500, category:"economy", img:"https://images.drivespark.com/webp/img/2023/04/maruti-suzuki-ciaz-prices-hiked-check-out-all-details-1681111543.jpg", brand:"Maruti Suzuki", description:"Sedan"},
];

let cars = JSON.parse(localStorage.getItem('cars')) || defaultCars;
if (!localStorage.getItem('cars')) {
    localStorage.setItem('cars', JSON.stringify(cars));
}

function showAuth(type) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="showAuth('${type}')"]`).classList.add('active');
    document.getElementById('loginForm').style.display = type === 'login' ? 'block' : 'none';
    document.getElementById('signupForm').style.display = type === 'signup' ? 'block' : 'none';
}

function signup() {
    let name = document.getElementById('signupName').value.trim();
    let email = document.getElementById('signupEmail').value.trim();
    let pwd = document.getElementById('signupPwd').value;
    let confirmPwd = document.getElementById('signupConfirmPwd').value;
    let error = document.getElementById('signupError');
    error.innerText = '';
    if (!name || !email || !pwd || !confirmPwd) {
        error.innerText = "All fields are required";
        return;
    }
    if (pwd !== confirmPwd) {
        error.innerText = "Passwords do not match";
        return;
    }
    if (users.find(u => u.email === email)) {
        error.innerText = "Email already exists";
        return;
    }
    users.push({name, email, password: pwd, role: 'user'});
    localStorage.setItem('users', JSON.stringify(users));
    error.innerText = "Sign up successful! Please login.";
    showAuth('login');
}

function login() {
    let email = document.getElementById('loginEmail').value.trim();
    let pwd = document.getElementById('loginPwd').value;
    let error = document.getElementById('loginError');
    error.innerText = '';
    if (email === 'admin' && pwd === '1234') {
        currentUser = {name: 'Admin', email: 'admin', role: 'admin'};
        role = 'admin';
        loginSuccess();
        return;
    }
    let user = users.find(u => u.email === email && u.password === pwd);
    if (user) {
        currentUser = user;
        role = user.role;
        loginSuccess();
    } else {
        error.innerText = "Invalid credentials";
    }
}

function loginSuccess() {
    loginScreen.style.display = "none";
    app.style.display = "block";
    if (role === 'admin') {
        document.querySelector('.nav-links').innerHTML += '<a onclick="show(\'admin\')">Admin Portal</a>';
        document.getElementById('addCarForm').addEventListener('submit', handleCarSubmit);
    }
    // Add logout button for all users
    document.querySelector('.nav-links').innerHTML += '<button class="logout-btn" onclick="logout()">Logout</button>';
    filterCars();
    displayCars(cars.slice(0,3), 'featuredGrid');
}

function logout() {
    // Clear user session
    currentUser = null;
    role = 'user';
    
    // Reset navigation (remove admin link and logout button)
    document.querySelector('.nav-links').innerHTML = `
        <a onclick="show('home')">Collection</a>
        <a onclick="show('buy')">Inventory</a>
        <a onclick="show('emi')">Finance</a>
        <a onclick="show('reviews')">Reviews</a>
        <a onclick="show('contact')">Contact</a>
        <button class="theme-btn" onclick="toggleTheme()">🌓 Mode</button>
    `;
    
    // Hide app and show login screen
    app.style.display = "none";
    loginScreen.style.display = "block";
    
    // Clear any error messages
    document.getElementById('loginError').innerText = '';
    document.getElementById('signupError').innerText = '';
    
    // Reset forms
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPwd').value = '';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPwd').value = '';
    document.getElementById('signupConfirmPwd').value = '';
}

function show(id){
    if (role !== 'admin' && id === 'admin') return;
    document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo(0,0);
    if (id === 'admin') {
        showAdminTab('add'); // Default to add car tab
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCars();
}

function filterCars() {
    let searchKey = document.getElementById("searchInput").value.toLowerCase();
    let filtered = cars.filter(c => {
        let matchesSearch = c.name.toLowerCase().includes(searchKey);
        let matchesCategory = (currentCategory === 'all' || c.category === currentCategory);
        return matchesSearch && matchesCategory;
    });
    displayCars(filtered, 'carGrid');
}

function displayCars(list, targetId){
    const container = document.getElementById(targetId);
    container.innerHTML="";

    list.forEach(c=>{
        let buttons = '';
        if (role === 'admin') {
            buttons = `
                <button onclick="editCar(${c.id})" style="margin:5px; background:var(--accent); color:white; border:none; padding:5px 10px; border-radius:5px;">Edit</button>
                <button onclick="deleteCar(${c.id})" style="margin:5px; background:#dc2626; color:white; border:none; padding:5px 10px; border-radius:5px;">Delete</button>
            `;
        }
        container.innerHTML += `
        <div class="card">
            <img src="${c.img}" alt="${c.name}">
            <div class="card-body">
                <h3>${c.name}</h3>
                <div class="card-meta">
                    <span>📅 ${c.year}</span> |
                    <span>⛽ ${c.fuel}</span> |
                    <span>🛣️ ${c.kms.toLocaleString()} km</span>
                </div>
                <p class="price">₹${(c.price/100000).toFixed(1)} Lakh</p>
                ${buttons}
                <button onclick="addToCompare(${c.id})" style="margin-top:10px;background:transparent;border:1px solid var(--accent);color:var(--accent);font-size:12px;">+ Add to Compare</button>
                <button onclick="bookTestDrive('${c.name}')" style="margin-top:10px;background:var(--accent);font-size:12px;">Book Test Drive</button>
            </div>
        </div>`;
    });
}

function addToCompare(id) {
    if(compareList.length >= 2 && !compareList.find(c=>c.id === id)) compareList.shift();
    const car = cars.find(c => c.id === id);
    if(!compareList.find(c=>c.id === id)) compareList.push(car);
    
    document.getElementById('compareCount').innerText = compareList.length;
    document.getElementById('compareBar').style.display = compareList.length > 0 ? 'block' : 'none';
}

function openCompare() {
    if(compareList.length < 2) {
        alert("Select at least 2 cars to compare.");
        return;
    }
    const modal = document.getElementById('compareModal');
    const content = document.getElementById('compareContent');
    modal.style.display = "block";
    content.innerHTML = compareList.map(c => `
        <div style="background:var(--card); padding:30px; border-radius:20px; border:1px solid var(--accent)">
            <img src="${c.img}" style="width:100%; border-radius:15px; margin-bottom:20px; height:200px; object-fit:cover;" alt="${c.name}">
            <h2>${c.name}</h2>
            <hr style="margin:20px 0; opacity:0.1">
            <p><b>Price:</b> ₹${c.price.toLocaleString()}</p>
            <p><b>Year:</b> ${c.year}</p>
            <p><b>Fuel:</b> ${c.fuel}</p>
            <p><b>Usage:</b> ${c.kms} km</p>
        </div>
    `).join('');
}

function closeCompare() {
    document.getElementById('compareModal').style.display = "none";
}

function calcEMI(){
    let p = amount.value;
    let r = rate.value/1200;
    let n = years.value*12;
    if(!p || !r || !n) return;
    let emi = (p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    document.getElementById('emiResult').innerText = "Premium Monthly Outflow: ₹" + Math.round(emi).toLocaleString();
}

function bookTestDrive(carName){
    const notification = document.createElement("div");
    notification.innerText = "✅ Test Drive booked for " + carName;
    notification.style.position = "fixed";
    notification.style.bottom = "30px";
    notification.style.right = "30px";
    notification.style.background = "#22c55e";
    notification.style.color = "white";
    notification.style.padding = "15px 25px";
    notification.style.borderRadius = "10px";
    notification.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
    notification.style.zIndex = "5000";
    notification.style.fontWeight = "600";
    document.body.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },3000);
}

let reviews = [];

function submitReview(){
    let name = document.getElementById("reviewName").value;
    let rating = document.getElementById("reviewRating").value;
    let comment = document.getElementById("reviewComment").value;
    if(!name || !rating || !comment){
        alert("Please fill all fields");
        return;
    }
    let review = {
        name:name,
        rating:rating,
        comment:comment
    };
    reviews.push(review);
    displayReviews();
    document.getElementById("reviewName").value="";
    document.getElementById("reviewRating").value="";
    document.getElementById("reviewComment").value="";
}

function displayReviews(){
    let container = document.getElementById("reviewList");
    container.innerHTML="";
    reviews.forEach(r=>{
        let stars="";
        for(let i=0;i<r.rating;i++){
            stars+="⭐";
        }
        container.innerHTML+=`
        <div class="review-card">
            <h4>${r.name}</h4>
            <div class="review-stars">${stars}</div>
            <p>${r.comment}</p>
        </div>
        `;
    });
}

function showAdminTab(tab) {
    // Hide all admin sections
    document.getElementById('addCarSection').style.display = 'none';
    document.getElementById('manageCarsSection').style.display = 'none';
    document.getElementById('usersSection').style.display = 'none';
    document.getElementById('statsSection').style.display = 'none';

    // Remove active class from all tabs
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));

    // Show selected tab and add active class
    document.getElementById(tab + 'Section').style.display = 'block';
    document.getElementById(tab + 'Tab').classList.add('active');

    // Load data for the selected tab
    if (tab === 'manage') {
        displayManageCars();
    } else if (tab === 'users') {
        displayUsers();
    } else if (tab === 'stats') {
        displayStats();
    }
}
function handleCarSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('carName').value.trim();
    let brand = document.getElementById('carBrand').value.trim();
    let price = parseInt(document.getElementById('carPrice').value);
    let img = document.getElementById('carImg').value.trim();
    let desc = document.getElementById('carDesc').value.trim();
    let year = parseInt(document.getElementById('carYear').value) || 2024;
    let fuel = document.getElementById('carFuel').value;
    let kms = parseInt(document.getElementById('carKms').value) || 0;
    let category = document.getElementById('carCategory').value;

    if (!name || !brand || !price || !img) {
        alert('Please fill in all required fields');
        return;
    }

    if (editingId) {
        let car = cars.find(c => c.id === editingId);
        car.name = name;
        car.brand = brand;
        car.price = price;
        car.img = img;
        car.description = desc;
        car.year = year;
        car.fuel = fuel;
        car.kms = kms;
        car.category = category;
        editingId = null;
        document.querySelector('#addCarForm button').innerText = 'Add Car';
    } else {
        let id = Date.now();
        cars.push({id, name, brand, price, img, description: desc, year, fuel, kms, category});
    }
    localStorage.setItem('cars', JSON.stringify(cars));
    displayManageCars();
    filterCars();
    this.reset();
    showAdminTab('manage'); // Switch to manage tab after adding
}

function displayManageCars() {
    let html = '';
    cars.forEach(c => {
        html += `
        <div class="card">
            <img src="${c.img}" alt="${c.name}">
            <div class="card-body">
                <h3>${c.name}</h3>
                <p>Brand: ${c.brand || 'N/A'}</p>
                <p>Price: ₹${c.price.toLocaleString()}</p>
                <p>Year: ${c.year} | Fuel: ${c.fuel} | ${c.kms} km</p>
                <button onclick="editCar(${c.id})" style="margin:5px; background:var(--accent); color:white; border:none; padding:5px 10px; border-radius:5px;">Edit</button>
                <button onclick="deleteCar(${c.id})" style="margin:5px; background:#dc2626; color:white; border:none; padding:5px 10px; border-radius:5px;">Delete</button>
            </div>
        </div>
        `;
    });
    document.getElementById('manageCars').innerHTML = html;
}

function filterAdminCars() {
    let searchTerm = document.getElementById('adminSearch').value.toLowerCase();
    let filtered = cars.filter(c =>
        c.name.toLowerCase().includes(searchTerm) ||
        c.brand.toLowerCase().includes(searchTerm) ||
        c.category.toLowerCase().includes(searchTerm)
    );

    let html = '';
    filtered.forEach(c => {
        html += `
        <div class="card">
            <img src="${c.img}" alt="${c.name}">
            <div class="card-body">
                <h3>${c.name}</h3>
                <p>Brand: ${c.brand || 'N/A'}</p>
                <p>Price: ₹${c.price.toLocaleString()}</p>
                <p>Year: ${c.year} | Fuel: ${c.fuel} | ${c.kms} km</p>
                <button onclick="editCar(${c.id})" style="margin:5px; background:var(--accent); color:white; border:none; padding:5px 10px; border-radius:5px;">Edit</button>
                <button onclick="deleteCar(${c.id})" style="margin:5px; background:#dc2626; color:white; border:none; padding:5px 10px; border-radius:5px;">Delete</button>
            </div>
        </div>
        `;
    });
    document.getElementById('manageCars').innerHTML = html;
}

function displayUsers() {
    document.getElementById('userCount').innerText = users.length;
    let html = '<div style="display: grid; gap: 10px;">';
    users.forEach(user => {
        html += `
        <div style="background: var(--bg); padding: 15px; border-radius: 8px; border: 1px solid var(--border);">
            <strong>${user.name}</strong> - ${user.email} (${user.role})
        </div>
        `;
    });
    html += '</div>';
    document.getElementById('userList').innerHTML = html;
}

function displayStats() {
    document.getElementById('totalCars').innerText = cars.length;
    document.getElementById('totalUsers').innerText = users.length;
    document.getElementById('premiumCars').innerText = cars.filter(c => c.category === 'premium').length;
    document.getElementById('sportCars').innerText = cars.filter(c => c.category === 'sport').length;
}

function editCar(id) {
    let car = cars.find(c => c.id === id);
    document.getElementById('carName').value = car.name;
    document.getElementById('carBrand').value = car.brand || '';
    document.getElementById('carPrice').value = car.price;
    document.getElementById('carImg').value = car.img;
    document.getElementById('carDesc').value = car.description || '';
    document.getElementById('carYear').value = car.year || 2024;
    document.getElementById('carFuel').value = car.fuel || 'Petrol';
    document.getElementById('carKms').value = car.kms || 0;
    document.getElementById('carCategory').value = car.category || 'premium';
    editingId = id;
    document.querySelector('#addCarForm button').innerText = 'Update Car';
    show('admin');
    showAdminTab('add'); // Switch to add tab for editing
}

function deleteCar(id) {
    if (confirm('Delete this car?')) {
        cars = cars.filter(c => c.id !== id);
        localStorage.setItem('cars', JSON.stringify(cars));
        displayManageCars();
        filterCars();
    }
}