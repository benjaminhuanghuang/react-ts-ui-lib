## css transform and transition
```
  .submenu-item {
    position: relative;
    .submenu-title {
      display: flex;
      align-items: center;
    }
    .arrow-icon {
      transition: transform .25s ease-in-out;
      margin-left: 3px;
    }
    &:hover {
      .arrow-icon {
        transform: rotate(180deg);
      }
    }
  }
```
For vertical mode
```
.is-vertical {
    .arrow-icon {
      transform: rotate(0deg) !important;
    }
  }
.is-vertical.is-opened {
  .arrow-icon {
    transform: rotate(180deg) !important;
  }
```
