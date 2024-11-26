export default class Timer {
    constructor(root) {
        this.el = {
            years: root.querySelector(".timer__part--years"),
            days: root.querySelector(".timer__part--days"),
            hours: root.querySelector(".timer__part--hours"),
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"), // Botão de controle
            reset: root.querySelector(".timer__btn--reset"), // Botão de reset
        };

        this.interval = null;
        this.targetDate = null; // Data futura será armazenada aqui

        // Só adiciona os eventos se os botões existirem
        if (this.el.control) {
            this.el.control.addEventListener("click", () => {
                if (this.interval === null) {
                    this.start();
                } else {
                    this.stop();
                }
            });
        }

        if (this.el.reset) {
            this.el.reset.addEventListener("click", () => {
                this.stop();
                this.updateInterfaceTime(0);
            });
        }
    }

    updateInterfaceTime(remainingSeconds) {
        const years = Math.floor(remainingSeconds / (365 * 24 * 60 * 60));
        const days = Math.floor((remainingSeconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
        const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
        const seconds = remainingSeconds % 60;

        this.el.years.textContent = years.toString().padStart(2, "0");
        this.el.days.textContent = days.toString().padStart(2, "0");
        this.el.hours.textContent = hours.toString().padStart(2, "0");
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    start() {
        if (!this.targetDate) return;

        this.interval = setInterval(() => {
            const currentDate = new Date();
            const diffInSeconds = Math.floor((this.targetDate - currentDate) / 1000);

            if (diffInSeconds <= 0) {
                this.stop();
                this.updateInterfaceTime(0);
                alert("A cápsula do tempo chegou ao destino!");
                window.location.href = "exibir_capsula.html"; // Redireciona
            } else {
                this.updateInterfaceTime(diffInSeconds);
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }

    updateInterfaceControls() {
        if (this.el.control) {
            if (this.interval === null) {
                this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
                this.el.control.classList.add("timer__btn--start");
                this.el.control.classList.remove("timer__btn--stop");
            } else {
                this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
                this.el.control.classList.add("timer__btn--stop");
                this.el.control.classList.remove("timer__btn--start");
            }
        }
    }
}

// Inicialização do Timer
const root = document.getElementById("timer");
const timer = new Timer(root);

// Dados do usuário ativo
const usuarios = JSON.parse(localStorage.getItem("usuariosCadastrados")) || [];
const usuarioAtivo = localStorage.getItem("usuarioAtivo");
const usuario = usuarios.find(user => user.email === usuarioAtivo);

if (usuario && usuario.futureDate) {
    const targetDate = new Date(usuario.futureDate);

    if (targetDate > new Date()) {
        timer.targetDate = targetDate;

        const diffInSeconds = Math.floor((targetDate - new Date()) / 1000);
        timer.updateInterfaceTime(diffInSeconds);
        timer.start();
    } else {
        alert("A data futura já passou. Redefina sua cápsula do tempo.");
        window.location.href = "criar_capsula.html";
    }
} else {
    alert("Nenhuma data configurada. Por favor, configure sua cápsula do tempo.");
    window.location.href = "criar_capsula.html";
}
