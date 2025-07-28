# Componente If

El componente `If` permite renderizar contenido condicional usando una sintaxis declarativa con slots `Then` y `Else`.

## Uso básico

```astro
---
import If from '../components/If.astro';

const isLoggedIn = true;
---

<If condition={isLoggedIn}>
  <Then>
    <p>¡Bienvenido! Has iniciado sesión.</p>
  </Then>
  <Else>
    <p>Por favor, inicia sesión para continuar.</p>
  </Else>
</If>
```

## Props

- `condition`: `boolean` - La condición que determina qué slot renderizar

## Slots

- `then`: Se renderiza cuando `condition` es `true`
- `else`: Se renderiza cuando `condition` es `false`

## Ejemplos

### Contenido complejo

```astro
<If condition={userRole === "admin"}>
  <Then>
    <div class="admin-panel">
      <h3>Panel de Administrador</h3>
      <ul>
        <li>Gestionar usuarios</li>
        <li>Configurar sistema</li>
        <li>Ver logs</li>
      </ul>
      <button type="button">Acciones administrativas</button>
    </div>
  </Then>
  <Else>
    <div class="user-panel">
      <h3>Panel de Usuario</h3>
      <p>Funciones básicas disponibles</p>
      <button type="button">Acciones de usuario</button>
    </div>
  </Else>
</If>
```

### Múltiples elementos

```astro
<If condition={showAdvancedFeatures}>
  <Then>
    <div>Panel de control</div>
    <nav>
      <a href="/admin/users">Usuarios</a>
      <a href="/admin/settings">Configuración</a>
    </nav>
    <footer>Acceso administrativo</footer>
  </Then>
  <Else>
    <div>Panel de usuario</div>
    <nav>
      <a href="/profile">Perfil</a>
      <a href="/settings">Configuración</a>
    </nav>
    <footer>Acceso de usuario</footer>
  </Else>
</If>
```

### Contenido vacío

```astro
<If condition={false}>
  <Then>
    <!-- Este contenido no se mostrará -->
  </Then>
  <Else>
    <p>No hay contenido en el slot "then"</p>
  </Else>
</If>
```

## Diferencias con el componente Show

- `Show` renderiza contenido solo cuando la condición es verdadera
- `If` permite especificar contenido tanto para el caso verdadero como para el falso
- `If` usa una sintaxis más declarativa con slots nombrados
- `Show` es más simple y directo para casos donde solo necesitas mostrar/ocultar contenido

## Casos de uso recomendados

- Cuando necesitas mostrar contenido diferente según una condición
- Para implementar lógica de autenticación/autorización
- Para mostrar diferentes versiones de un componente según el estado
- Cuando quieres una sintaxis más legible que ternarios en el template
