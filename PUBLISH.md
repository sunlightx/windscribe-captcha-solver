# Инструкция по публикации в npm

## Шаг 1: Подготовка package.json

1. Заполните поле `author` в `package.json`:

   ```json
   "author": "Ваше Имя <your.email@example.com>"
   ```

   или просто:

   ```json
   "author": "Ваше Имя"
   ```

2. Если у вас есть Git репозиторий, заполните `repository.url`:
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/yourusername/slider-captcha-solver.git"
   }
   ```

## Шаг 2: Проверка имени пакета

Проверьте, что имя `slider-captcha-solver` свободно:

```bash
npm view slider-captcha-solver
```

Если пакет уже существует, измените имя в `package.json` на уникальное (например, `@yourusername/slider-captcha-solver`).

## Шаг 3: Создание аккаунта npm

Если у вас еще нет аккаунта:

1. Перейдите на https://www.npmjs.com/signup
2. Создайте аккаунт

## Шаг 4: Вход в npm

```bash
npm login
```

Введите:

- Username (имя пользователя)
- Password (пароль)
- Email (email адрес)
- OTP (одноразовый код из email, если включена 2FA)

## Шаг 5: Проверка файлов перед публикацией

Убедитесь, что все нужные файлы на месте:

- ✅ `index.js` - основной файл
- ✅ `package.json` - конфигурация
- ✅ `README.md` - документация
- ✅ `.npmignore` - исключения

Проверьте, что будет опубликовано:

```bash
npm pack --dry-run
```

## Шаг 6: Публикация

```bash
npm publish
```

Если имя пакета начинается с `@yourusername/`, используйте:

```bash
npm publish --access public
```

## Шаг 7: Проверка публикации

После публикации проверьте:

```bash
npm view slider-captcha-solver
```

Или откройте в браузере:

```
https://www.npmjs.com/package/slider-captcha-solver
```

## Обновление версии

Для обновления пакета:

1. Обновите версию в `package.json`:

   ```json
   "version": "1.0.1"
   ```

2. Или используйте npm команды:

   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

3. Опубликуйте снова:
   ```bash
   npm publish
   ```

## Установка после публикации

После публикации другие пользователи смогут установить:

```bash
npm install slider-captcha-solver
```

## Важные замечания

- ⚠️ После публикации нельзя удалить пакет в течение 72 часов
- ⚠️ Нельзя перезаписать версию (например, 1.0.0 можно опубликовать только один раз)
- ✅ Всегда увеличивайте версию перед новой публикацией
- ✅ Тестируйте локально перед публикацией: `npm link`
