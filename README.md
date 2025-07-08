- Modern ve responsive admin dashboard tasarımı
- Gerçek zamanlı oda ve kullanıcı takibi
- Socket.io bağlantı yönetimi iyileştirildi
- ChatBox component'i güncellendi
- Layout padding sorunları düzeltildi
- Yeni admin login ve dashboard sayfaları eklendi

# WebSocket Chat Uygulaması

Modern, gerçek zamanlı chat uygulaması. Next.js, Socket.IO ve TypeScript kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Gerçek zamanlı mesajlaşma** - Anında mesaj iletimi
- **Çoklu oda desteği** - Farklı odalarda sohbet
- **Admin paneli** - Odaları ve kullanıcıları yönetme
- **Responsive tasarım** - Mobil ve masaüstü uyumlu
- **Modern UI** - Tailwind CSS ile şık tasarım

## 📋 Gereksinimler

Projeyi çalıştırmak için sisteminizde şunlar yüklü olmalıdır:

- **Node.js** (v18.0.0 veya üzeri)
- **npm** (Node.js ile birlikte gelir)
- **Git** (opsiyonel, klonlama için)

### Node.js Kurulumu

1. [Node.js resmi sitesine](https://nodejs.org/) gidin
2. "LTS" versiyonu indirin ve kurun
3. Terminal/cmd'de kontrol edin:
   ```bash
   node --version
   npm --version
   ```

## 🔧 Kurulum

### 1. Projeyi İndirin

**Git ile klonlama:**
```bash
git clone https://github.com/asinamli/websocketio2-chat.git
cd websocketio2-chat
```

**Veya ZIP olarak indirin:**
- GitHub'dan "Code" > "Download ZIP"
- ZIP'i çıkarın ve klasöre girin

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

### 4. Uygulamayı Açın

Tarayıcınızda şu adresi açın:
```
http://localhost:3000
```

## 🎯 Kullanım

### Chat Kullanımı

1. **Ana sayfa**'da (`http://localhost:3000`)
2. **İsminizi** girin
3. **Oda adı** girin (yoksa otomatik oluşturulur)
4. **"Odaya Katıl"** butonuna tıklayın
5. **Mesajlaşmaya** başlayın!

### Admin Paneli

1. **Admin Giriş**'e tıklayın (`http://localhost:3000/admin/login`)
2. **Şifre**: `admin123`
3. **Dashboard**'da tüm odaları ve kullanıcıları görün

## 📁 Proje Yapısı

```
websocket-chat-v2/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── dashboard/page.tsx    # Admin paneli
│   │   │   └── login/page.tsx        # Admin giriş
│   │   ├── globals.css               # Global stiller
│   │   ├── layout.tsx                # Ana layout
│   │   └── page.tsx                  # Ana sayfa
│   └── components/
│       ├── ChatBox.tsx               # Chat bileşeni
│       ├── RoomUsersModal.tsx        # Kullanıcı listesi modal
│       └── RoomListModal.tsx         # Oda listesi modal
├── pages/
│   └── api/
│       └── socket.ts                 # Socket.IO sunucusu
├── package.json
└── README.md
```

## 🌐 Deployment (Yayınlama)

### Vercel ile Deployment

1. **Vercel hesabı** oluşturun: [vercel.com](https://vercel.com)
2. **GitHub repo'nuz** ile bağlayın
3. **Auto-deploy** aktif olur
4. Her git push'ta otomatik güncellenir

### Netlify ile Deployment

1. **Netlify hesabı** oluşturun: [netlify.com](https://netlify.com)
2. **GitHub repo'nuz** ile bağlayın
3. **Build komutu**: `npm run build`
4. **Publish directory**: `.next`

### Manuel Deployment

```bash
# Projeyi build edin
npm run build

# Production sunucusunu başlatın
npm start
```

## 🔧 Yapılandırma

### Socket.IO Ayarları

`pages/api/socket.ts` dosyasında:

```typescript
// CORS ayarları
cors: {
  origin: "*",  // Production'da domain'inizi belirtin
  methods: ["GET", "POST"]
}
```

### Admin Şifresi

`src/app/admin/login/page.tsx` dosyasında:

```typescript
// Şifreyi değiştirin
const correctPassword = "admin123";  // Buraya yeni şifre
```

## 🐛 Sorun Giderme

### Port Zaten Kullanımda

```bash
# Farklı port kullanın
npm run dev -- --port 3001
```

### Socket Bağlantı Sorunu

1. **Firewall** ayarlarını kontrol edin
2. **3000 portu** açık olmalı
3. **Localhost** yerine IP adresi deneyin

### Build Hatası

```bash
# node_modules'ı temizleyin
rm -rf node_modules
npm install
```

## 🛠️ Geliştirme

### Yeni Özellik Ekleme

1. **Branch** oluşturun:
   ```bash
   git checkout -b yeni-ozellik
   ```

2. **Değişiklik** yapın

3. **Test** edin:
   ```bash
   npm run dev
   ```

4. **Commit** edin:
   ```bash
   git add .
   git commit -m "Yeni özellik: ..."
   git push origin yeni-ozellik
   ```

### Teknolojiler

- **Next.js 14** - React framework
- **Socket.IO** - Gerçek zamanlı iletişim
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## 📞 Destek

Sorularınız için:

- **GitHub Issues**: [Sorun bildirin](https://github.com/asinamli/websocketio2-chat/issues)
- **Email**: [İletişim](mailto:namliasiyee@gmail.com)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. **Fork** edin
2. **Feature branch** oluşturun
3. **Commit** edin
4. **Push** edin
5. **Pull Request** oluşturun

---

**Teşekkürler!** 🎉

Bu README size yardımcı oldu mu? Sorunuz varsa çekinmeden sorun!
