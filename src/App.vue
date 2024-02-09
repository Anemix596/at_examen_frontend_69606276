<template>
  <div id="page-container" class="fade page-header-fixed page-sidebar-fixed page-with-wide-sidebar">
    <div id="header" class="header navbar-default">
			<!-- begin navbar-header -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed navbar-toggle-left" data-click="sidebar-minify">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<button type="button" class="navbar-toggle" data-click="sidebar-toggled">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a href="index.html" class="navbar-brand">
					<b>TIENDA DE LIBROS</b>
				</a>
			</div>			
		</div>

    <!-- begin #sidebar -->
		<div id="sidebar" class="sidebar" data-disable-slide-animation="true">
			<!-- begin sidebar scrollbar -->
			<div data-scrollbar="true" data-height="100%">
				<!-- begin sidebar user -->
				<ul class="nav">
					<li class="nav-profile">
						<a href="javascript:;" data-toggle="nav-profile">
							<div class="cover with-shadow"></div>
							
							<div class="info">
								<b class="caret pull-right"></b>Bienvenido
								<small>Front end developer</small>
							</div>
						</a>
					</li>
					
				</ul>
				<!-- end sidebar user -->
				<!-- begin sidebar nav -->
				<ul class="nav"><li class="nav-header">Interactuar</li>

					<li>
            <router-link style="text-decoration: none;" to="/prestamo">
              <a href="calendar.html">
                <i class="material-icons">date_range</i> 
                <span style="text-decoration: none;color: antiquewhite;">Prestamos</span>
              </a>
            </router-link>
					</li>

          <li>
            <router-link style="text-decoration: none;" to="/autor">
              <a href="calendar.html">
                <i class="material-icons">date_range</i> 
                <span style="text-decoration: none;color: antiquewhite;">Autores</span>
              </a>
            </router-link>
					</li>

          <li>
            <router-link style="text-decoration: none;" to="/libro">
              <a href="calendar.html">
                <i class="material-icons">date_range</i> 
                <span style="text-decoration: none;color: antiquewhite;">Libros</span>
              </a>
            </router-link>
					</li>

          <li>
            <router-link style="text-decoration: none;" to="/cliente">
              <a href="calendar.html">
                <i class="material-icons">date_range</i> 
                <span style="text-decoration: none;color: antiquewhite;">Clientes</span>
              </a>
            </router-link>
					</li>

					<!-- begin sidebar minify button -->
					<li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>
					<!-- end sidebar minify button -->
				</ul>
				<!-- end sidebar nav -->
			</div>
			<!-- end sidebar scrollbar -->
		</div>
		<div class="sidebar-bg"></div>

    <div id="content" class="content">
      
    </div>

  </div>
 
    
      <router-view></router-view>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
// Importar el componente VerificarConexion.vue

</script>

<style>

</style>

