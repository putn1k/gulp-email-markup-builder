## Начало работы

Для работы с данной сборкой в новом проекте, склонируйте все содержимое репозитория<br>
Затем, находясь в корне проекта, запустите команду `npm i`, которая установит все находящиеся в __package.json__ зависимости.<br>
После этого вы можете использовать любую из трех предложенных команд сборки (итоговые файлы попадают в папку __build__ корневой директории): 

`gulp` - базовая команда, которая запускает сборку для разработки, используя `browser-sync`.

`gulp build` - команда для сборки без включения сервера `browser-sync`.

`gulp clean` - команда удаления всех файлов из папки __build__ корневой директории.

## Структура папок и файлов

```
│   ├── html/                        # Папка для хранения html-блоков страницы
│   │   └── common/                  # Папка для хранения общих html-блоков
│   │   └── template/                # Пример папки для подключения блоков страницы, для удобного структурирования файлов
│   └── template.html                # Пример страницы
├── .editorconfig                    # Файл с настройками форматирования кода
├── .gitignore                       # Файл, указывающий неотслеживаемые git файлы и папки 
├── gulpfile.js                      # Файл с настройками сборки
├── package.json                     # Файл с настройками сборки и установленными пакетами
├── package-lock.json                # Файл с настройками пакетов для локальных зависимостей
└── README.md                        # Информация о сборке
└── sitemap.html                     # Карта страниц сборки
└── Workflow.md                      # Инструкция по работе со сборкой
```

## Оглавление
1. [npm-скрипты](#npm-скрипты)
2. [Работа с html](#работа-с-html)


## npm-скрипты

Вы можете вызывать gulp-скрипты через npm.

`npm start` - команда, аналогичная команде gulp.

`npm run build` - команда, аналогичная команде gulp build.

`npm run clean` - команда, аналогичная команде gulp clean.

## Работа с html

Благодаря плагину __gulp-file-include__ вы можете разделять html-файл на различные шаблоны, которые должны храниться в папке __html__. Удобно делить html-страницу на секции. Обратите внимание, что все html файлы, вложенные в папки __scr/html/*__ имеют надстройку editorconfig которая не добавляет пустую строку в конец, чтобы при сборке не образовывалось лишних пустых строк после плагина __gulp-file-include__

> Для вставки html-частей в главный файл используйте `@include('html/filename.html')`

Для создания еще одного варианта письма можно скопировать и переименовать __template.html__. После новая страница попадет в карту страниц __sitemap.html__.

Файл __template.html__ и папка __html/template__ созданы для удобства создания новых страниц и в сборке не учтаствуют.

В конце сборка отформатирует html-файлы с учетом настройки __gulp-html-beautify__.
