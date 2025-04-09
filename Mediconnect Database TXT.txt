CREATE DATABASE IF NOT EXISTS mediconnect;

USE mediconnect;

-- Create `users` table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    role_code INT NOT NULL,
    adress TEXT NOT NULL,
    tel VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    etoile INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into `users` table
INSERT INTO users (first_name, last_name, role, role_code, adress, tel, date, image_url, etoile) 
VALUES
('Tariq', 'Dr.', 'Médecin', 1, '123 Main St', '123-456-7890', '2023-12-01', 'https://randomuser.me/api/portraits/men/10.jpg', 3),
('Karim', 'Mouhoub', 'Médecin', 1, '101 Elm St', '321-654-0987', '2020-06-21', 'https://randomuser.me/api/portraits/men/11.jpg', 4),
('Nassim', 'Dr.', 'Médecin', 1, '890 Birch St', '555-666-7777', '2021-07-18', 'https://randomuser.me/api/portraits/men/12.jpg', 5),
('Yassine', 'Belhadj', 'Médecin', 1, '234 Maple St', '444-555-6666', '2022-03-22', 'https://randomuser.me/api/portraits/men/13.jpg', 4),
('Mehdi', 'Zakaria', 'Médecin', 1, '999 Redwood St', '123-987-6543', '2019-04-14', 'https://randomuser.me/api/portraits/men/14.jpg', 3),
('Sophie', 'Lemoine', 'Médecin', 1, '750 Champs-Élysées', '321-123-4567', '2018-05-05', 'https://randomuser.me/api/portraits/women/10.jpg', 5),
('Luc', 'Martin', 'Médecin', 1, '12 Rue de Paris', '456-789-0123', '2017-11-08', 'https://randomuser.me/api/portraits/men/15.jpg', 4),
('Luc', 'Maih', 'Patient', 2, 'Sidi Othmane', '456-789-0123', '2025-11-08', 'https://randomuser.me/api/portraits/men/15.jpg');


-- Create `available_times` table
CREATE TABLE available_times (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    available_time TIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert available times for each user
INSERT INTO available_times (user_id, available_time) VALUES
(1, '08:00'), (1, '09:00'), (1, '10:00'), (1, '11:00'), (1, '12:00'), (1, '13:00'), (1, '14:00'), (1, '15:00'), (1, '16:00'), (1, '17:00'), (1, '18:00'),
(2, '08:00'), (2, '09:00'), (2, '10:00'), (2, '11:00'), (2, '12:00'), (2, '13:00'), (2, '14:00'), (2, '15:00'), (2, '16:00'), (2, '17:00'), (2, '18:00'),
(3, '08:00'), (3, '09:00'), (3, '10:00'), (3, '11:00'), (3, '12:00'), (3, '13:00'), (3, '14:00'), (3, '15:00'), (3, '16:00'), (3, '17:00'), (3, '18:00'),
(4, '08:00'), (4, '09:00'), (4, '10:00'), (4, '11:00'), (4, '12:00'), (4, '13:00'), (4, '14:00'), (4, '15:00'), (4, '16:00'), (4, '17:00'), (4, '18:00'),
(5, '08:00'), (5, '09:00'), (5, '10:00'), (5, '11:00'), (5, '12:00'), (5, '13:00'), (5, '14:00'), (5, '15:00'), (5, '16:00'), (5, '17:00'), (5, '18:00'),
(6, '08:00'), (6, '09:00'), (6, '10:00'), (6, '11:00'), (6, '12:00'),
(7, '10:00'), (7, '11:00'), (7, '12:00'), (7, '14:00');

-- Create `booked_times` table
CREATE TABLE booked_times (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    booked_time TIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert booked times for each user
INSERT INTO booked_times (user_id, booked_time) VALUES
(1, '10:00'), (1, '14:00'),
(2, '11:00'), (2, '10:00'),
(3, '08:00'), (3, '14:00'), (3, '13:00'),
(4, '12:00'), (4, '15:00'),
(5, '10:00'), (5, '17:00'),
(6, '09:00'), (6, '11:00'),
(7, '10:00');
