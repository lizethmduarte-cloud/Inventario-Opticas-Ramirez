document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LÓGICA PARA LA PÁGINA DE PRODUCTOS
    // ==========================================
    const formProducto = document.getElementById("form-producto");
    const tablaProductosBody = document.getElementById("tabla-productos-body");

    if (formProducto) {
        formProducto.addEventListener("submit", (e) => {
            e.preventDefault();
            const codigo = document.getElementById("codigo").value;
            const nombre = document.getElementById("nombre").value;
            const categoriaSelect = document.getElementById("categoria");
            const categoria = categoriaSelect.options[categoriaSelect.selectedIndex].text;
            const precioCompra = parseFloat(document.getElementById("precio-compra").value);
            const precioVenta = parseFloat(document.getElementById("precio-venta").value);
            const cantidad = document.getElementById("cantidad").value;
            const formatoMoneda = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${codigo}</td>
                <td>${nombre}</td>
                <td>${categoria}</td>
                <td>${formatoMoneda.format(precioCompra)}</td>
                <td>${formatoMoneda.format(precioVenta)}</td>
                <td>${cantidad}</td>
                <td>
                    <button class="btn-accion btn-editar">Editar</button>
                    <button class="btn-accion btn-eliminar">Eliminar</button>
                </td>
            `;
            tablaProductosBody.appendChild(nuevaFila);
            formProducto.reset();
            alert("¡Producto guardado exitosamente!");
        });

        tablaProductosBody.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-eliminar")) {
                if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                    e.target.closest("tr").remove();
                }
            }
        });
    }

    // ==========================================
    // 2. LÓGICA PARA LA PÁGINA DE INVENTARIO
    // ==========================================
    const tablaInventarioBody = document.getElementById("tabla-inventario-body");
    const filtroSede = document.getElementById("filtro-sede");

    const inventarioData = [
        { codigo: 'OPT-0001', producto: 'Gafas Ray-Ban', sede: 'Ventura', stock: 15, minimo: 5 },
        { codigo: 'OPT-0002', producto: 'Lentes Acuvue', sede: 'Ventura', stock: 2, minimo: 5 },
        { codigo: 'OPT-0003', producto: 'Monturas Titanio', sede: 'Séptima', stock: 8, minimo: 3 },
        { codigo: 'OPT-0004', producto: 'Gafas de Sol Polarizadas', sede: 'Ensueño', stock: 1, minimo: 4 },
        { codigo: 'OPT-0005', producto: 'Estuches Rígidos', sede: 'Jardín', stock: 50, minimo: 10 },
        { codigo: 'OPT-0006', producto: 'Gafas Formuladas Infantiles', sede: 'Prado', stock: 4, minimo: 6 },
        { codigo: 'OPT-0007', producto: 'Líquido Limpiador', sede: 'San Mateo', stock: 20, minimo: 5 }
    ];

    function renderizarInventario(sedeFiltro = "todas") {
        if (!tablaInventarioBody) return;
        tablaInventarioBody.innerHTML = "";
        const datosFiltrados = sedeFiltro === "todas" ? inventarioData : inventarioData.filter(item => item.sede === sedeFiltro);

        datosFiltrados.forEach(item => {
            const esStockBajo = item.stock <= item.minimo;
            const estadoHTML = esStockBajo ? `<span class="badge-stock stock-bajo">Stock Bajo</span>` : `<span class="badge-stock stock-normal">Normal</span>`;
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.codigo}</td>
                <td>${item.producto}</td>
                <td>${item.sede}</td>
                <td>${item.stock}</td>
                <td>${item.minimo}</td>
                <td>${estadoHTML}</td>
            `;
            tablaInventarioBody.appendChild(fila);
        });

        if (datosFiltrados.length === 0) {
            tablaInventarioBody.innerHTML = `<tr><td colspan="6">No hay productos registrados en esta sede.</td></tr>`;
        }
    }

    if (tablaInventarioBody) {
        renderizarInventario();
        filtroSede.addEventListener("change", (e) => { renderizarInventario(e.target.value); });
    }

    // ==========================================
    // 3. LÓGICA PARA LA PÁGINA DE ENTRADAS
    // ==========================================
    const formEntrada = document.getElementById("form-entrada");
    const tablaEntradasBody = document.getElementById("tabla-entradas-body");

    if (formEntrada) {
        const hoy = new Date().toISOString().split('T')[0];
        document.getElementById("fecha-entrada").value = hoy;

        formEntrada.addEventListener("submit", (e) => {
            e.preventDefault();
            const fecha = document.getElementById("fecha-entrada").value;
            const producto = document.getElementById("producto-entrada").value;
            const sede = document.getElementById("sede-entrada").value;
            const cantidad = document.getElementById("cantidad-entrada").value;
            const proveedor = document.getElementById("proveedor-entrada").value;
            const fechaArray = fecha.split('-');
            const fechaFormateada = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`;

            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${fechaFormateada}</td>
                <td>${producto}</td>
                <td>${sede}</td>
                <td><span class="badge-entrada">+ ${cantidad}</span></td>
                <td>${proveedor}</td>
            `;
            tablaEntradasBody.prepend(nuevaFila);
            formEntrada.reset();
            document.getElementById("fecha-entrada").value = hoy;
            alert(`¡Entrada de ${cantidad} unidades registrada exitosamente!`);
        });
    }

    // ==========================================
    // 4. LÓGICA PARA LA PÁGINA DE SALIDAS
    // ==========================================
    const formSalida = document.getElementById("form-salida");
    const tablaSalidasBody = document.getElementById("tabla-salidas-body");

    if (formSalida) {
        const hoySalida = new Date().toISOString().split('T')[0];
        document.getElementById("fecha-salida").value = hoySalida;

        formSalida.addEventListener("submit", (e) => {
            e.preventDefault();
            const fecha = document.getElementById("fecha-salida").value;
            const producto = document.getElementById("producto-salida").value;
            const sede = document.getElementById("sede-salida").value;
            const cantidad = document.getElementById("cantidad-salida").value;
            const motivo = document.getElementById("motivo-salida").value;
            const fechaArray = fecha.split('-');
            const fechaFormateada = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`;

            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${fechaFormateada}</td>
                <td>${producto}</td>
                <td>${sede}</td>
                <td><span class="badge-salida">- ${cantidad}</span></td>
                <td>${motivo}</td>
            `;
            tablaSalidasBody.prepend(nuevaFila);
            formSalida.reset();
            document.getElementById("fecha-salida").value = hoySalida;
            alert(`¡Salida de ${cantidad} unidades registrada exitosamente!`);
        });
    }

    // ==========================================
    // 5. LÓGICA PARA LA PÁGINA DE TRASLADOS
    // ==========================================
    const formTraslado = document.getElementById("form-traslado");
    const tablaTrasladosBody = document.getElementById("tabla-traslados-body");

    if (formTraslado) {
        const hoyTraslado = new Date().toISOString().split('T')[0];
        document.getElementById("fecha-traslado").value = hoyTraslado;

        formTraslado.addEventListener("submit", (e) => {
            e.preventDefault();
            const fecha = document.getElementById("fecha-traslado").value;
            const producto = document.getElementById("producto-traslado").value;
            const sedeOrigen = document.getElementById("sede-origen").value;
            const sedeDestino = document.getElementById("sede-destino").value;
            const cantidad = document.getElementById("cantidad-traslado").value;

            if (sedeOrigen === sedeDestino) {
                alert("Error: La sede de origen y destino no pueden ser la misma.");
                return;
            }

            const fechaArray = fecha.split('-');
            const fechaFormateada = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`;

            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${fechaFormateada}</td>
                <td>${producto}</td>
                <td><span class="ruta-traslado">${sedeOrigen} → ${sedeDestino}</span></td>
                <td><span class="badge-traslado">${cantidad} un.</span></td>
            `;
            tablaTrasladosBody.prepend(nuevaFila);
            formTraslado.reset();
            document.getElementById("fecha-traslado").value = hoyTraslado;
            alert(`¡Traslado de ${cantidad} unidades de ${sedeOrigen} a ${sedeDestino} registrado!`);
        });
    }

    // ==========================================
    // 6. LÓGICA PARA LA PÁGINA DE REPORTES
    // ==========================================
    const tablaReportesBody = document.getElementById("tabla-reportes-body");
    
    if (tablaReportesBody) {
        const historialMovimientos = [
            { fecha: '10/11/2026', tipo: 'Entrada', producto: 'Monturas Titanio', detalle: 'Proveedor: Optica S.A.S', cantidad: 25, clase: 'tipo-entrada' },
            { fecha: '10/11/2026', tipo: 'Salida', producto: 'Gafas de Sol', detalle: 'Motivo: Venta', cantidad: 5, clase: 'tipo-salida' },
            { fecha: '09/11/2026', tipo: 'Traslado', producto: 'Lentes Acuvue', detalle: 'Ventura → Séptima', cantidad: 10, clase: 'tipo-traslado' },
            { fecha: '09/11/2026', tipo: 'Entrada', producto: 'Estuches Rígidos', detalle: 'Proveedor: Importados', cantidad: 100, clase: 'tipo-entrada' },
            { fecha: '08/11/2026', tipo: 'Salida', producto: 'Gafas Ray-Ban', detalle: 'Motivo: Garantía', cantidad: 2, clase: 'tipo-salida' }
        ];

        let sumEntradas = 0, sumSalidas = 0, sumTraslados = 0;

        historialMovimientos.forEach(mov => {
            if (mov.tipo === 'Entrada') sumEntradas += mov.cantidad;
            if (mov.tipo === 'Salida') sumSalidas += mov.cantidad;
            if (mov.tipo === 'Traslado') sumTraslados += mov.cantidad;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${mov.fecha}</td>
                <td><span class="etiqueta ${mov.clase}">${mov.tipo}</span></td>
                <td>${mov.producto}</td>
                <td>${mov.detalle}</td>
                <td>${mov.cantidad}</td>
            `;
            tablaReportesBody.appendChild(fila);
        });

        document.getElementById("total-entradas").textContent = sumEntradas;
        document.getElementById("total-salidas").textContent = sumSalidas;
        document.getElementById("total-traslados").textContent = sumTraslados;

        const btnsExportar = document.querySelectorAll(".btn-exportar");
        btnsExportar.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const tipo = e.target.textContent;
                alert(`Generando archivo... El reporte se descargará en formato ${tipo.includes('Excel') ? 'Excel' : 'PDF'}`);
            });
        });
    }

    // ==========================================
    // 7. LÓGICA PARA LA PÁGINA DE USUARIOS
    // ==========================================
    const formUsuario = document.getElementById("form-usuario");
    const tablaUsuariosBody = document.getElementById("tabla-usuarios-body");

    if (formUsuario) {
        formUsuario.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre-usuario").value;
            const correo = document.getElementById("correo-usuario").value;
            const rol = document.getElementById("rol-usuario").value;
            const claseBadge = rol === "Administrador" ? "badge-admin" : "badge-asesor";

            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${nombre}</td>
                <td>${correo}</td>
                <td><span class="badge-rol ${claseBadge}">${rol}</span></td>
                <td>
                    <button class="btn-accion btn-editar">Editar</button>
                    <button class="btn-accion btn-eliminar">Eliminar</button>
                </td>
            `;
            tablaUsuariosBody.appendChild(nuevaFila);
            formUsuario.reset();
            alert(`¡Usuario ${nombre} creado exitosamente con el rol de ${rol}!`);
        });

        tablaUsuariosBody.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-eliminar")) {
                if (confirm("¿Estás seguro de que deseas eliminar este usuario del sistema?")) {
                    e.target.closest("tr").remove();
                }
            }
        });
    }

});
