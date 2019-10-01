# Бэкенд для тестового задания

- При запуске сервера генерируется 500 случайных пациентов;
- По-умолчанию ни один из пациентов не отмечен выбранным;
- Перезапуск сервера вызывает сброс выбранного пациента.

## Запуск

```sh
cd ./backend
npm install
npm start
```

Запуститься сервер на `http://localhost:3000`.

## Типы данных

```ts
type Patient = {
  /* Идентификатор пациента */
  id: number;
  /* Имя */
  firstName: string;
  /* Отчество */
  middleName: string;
  /* Фамилия */
  lastName: string;
  /* Пол */
  gender: "m" | "f";
  /* Страна */
  county: string;
  /* Эл. почта */
  email: string;
  /* Дата рождения */
  birthDate: string; // YYYY-MM-DD
  /* Телефон */
  phone: number;
  /* Тариф: "VIP" или "Обычный" */
  servicePlan: "VIP" | "REGULAR";
  /* Код */
  code: string;
  /* Полис ОМС проверен */
  omsChecked: boolean;
  /* Пациент имеет долг */
  patientHasDebt: boolean;
  /* Плательщик имеет долг */
  payerHasDebt: boolean;
  /* Дата последнего визита */
  lastVisitDate: string; // YYYY-MM-DD
};
```

## Запросы

### Получить выбранного пациента

`GET /patients/selected`

#### Параметры запроса

нет

#### Параметры ответа

```ts
type Request = Patient;
```

---

### Поиск пациентов

`GET /patients/search`

#### Параметры запроса

```ts
type QueryParams = {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  phone?: string; // Только цифры
  birthDate?: string; // YYYY-MM-DD

  // Ограничение количества результатов
  offset?: number;
  limit?: number;
};
```

#### Параметры ответа

```ts
type Request = {
  totalCount: number;
  patients: Array<Patient>;
};
```

---

### Выбрать пациента

`POST /patients/selected`

#### Параметры запроса

```ts
type RequestBody = {
  /* Идентификатор пациента */
  id: number;
};
```

#### Параметры ответа

```ts
type Request = Patient;
```
