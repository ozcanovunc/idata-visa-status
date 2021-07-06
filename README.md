# idata-visa-status

A node.js application that checks visa status in a predefined interval. If the visa status changes, drops a mail to the applicant.

In the background, performs a request to https://idata.com.tr services.

Since there's no socket support, requests are performed via polling method.

## Usage

1) Go to the .env file of the repository, fill in the fields for the application query
    - COUNTRY
        - "de" for Germany
        - "ita" for Italy
    - PASSPORT, passport number, UXXXXXXXX
    - BARCODE, barcode number, XXXXXXX
    - APPLICANT_EMAIL, email address of the applicant
    - SMTP_EMAIL
    - SMTP_PASSWORD
    - SMTP_SERVICE, such as gmail
    - INTERVAL, polling interval in ms
2) Run index.js
    ```
    npm start
    ```

Eventually when the status of the application changes, applicant will receive a mail indicating the new status.
