import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { PokemonService } from '../../service/PokemonService';
import { RadioButton } from 'primereact/radiobutton';

function Home() {

  let emptyPokemon = {
    id: '',
    nome: '',
    descricao: '',
    image: '',
    peso: 0,
    tipo: '',
    statusInventario: 'Disponivel',
    rating: 0
  };

  const [pokemons, setPokemons] = useState(null);
  const [pokemonDialog, setPokemonDialog] = useState(false);
  const [pokemonDialogEdit, setPokemonEditDialog] = useState(false);
  const [deletePokemonDialog, setdeletePokemonDialog] = useState(false);
  const [deletePokemonsDialog, setDeletePokemonsDialog] = useState(false);
  const [pokemon, setPokemon] = useState(emptyPokemon);
  const [selectedPokemons, setSelectedPokemons] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    PokemonService.getPokemons().then((data) => setPokemons(data));
  }, []);

  const openNew = () => {
    setPokemon(emptyPokemon);
    setSubmitted(false);
    setPokemonDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setPokemonDialog(false);
    setPokemonEditDialog(false);
  };

  const hideDeletePokemonDialog = () => {
    setdeletePokemonDialog(false);
  };

  const hideDeletePokemonsDialog = () => {
    setDeletePokemonsDialog(false);
  };

  const onStatusChange = (e) => {
    let _pokemon = { ...pokemon };

    _pokemon['statusInventario'] = e.value;
    setPokemon(_pokemon);
};

  const savePokemonEdit = () => {
    debugger
    if (pokemon.id) {
      let _pokemons = [...pokemons];
      let _pokemon = { ...pokemon };
      const index = findIndexById(pokemon.id);

      if (index !== -1) {

      }

      _pokemons[index] = _pokemon;
      setPokemons(_pokemons);
      setPokemonEditDialog(false)
      setPokemon(emptyPokemon);
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Pokémon Atualizado', life: 3000 });
    }


  }

  const savePokemon = () => {
    setSubmitted(true);

    if (pokemon.nome.trim()) {
      debugger
      let _pokemons = [...pokemons];
      let _pokemon = { ...pokemon };

      const existingPokemonIndex = _pokemons.findIndex(p => p.id === _pokemon.id);

      if (existingPokemonIndex == -1) {
        _pokemons.push(_pokemon);
        setPokemons(_pokemons);
        setPokemonDialog(false);
        setPokemon(emptyPokemon);
        return;
      }
    }
  };

  const editPokemon = (pokemon) => {
    setPokemon({ ...pokemon });
    setPokemonEditDialog(true);
  };

  const confirmDeletePokemon = (pokemon) => {
    setPokemon(pokemon);
    setdeletePokemonDialog(true);
  };

  const deletePokemon = () => {
    let _pokemons = pokemons.filter((val) => val.id !== pokemon.id);

    setPokemons(_pokemons);
    setdeletePokemonDialog(false);
    setPokemon(emptyPokemon);
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Pokémon Deletado', life: 3000 });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < pokemons.length; i++) {
      if (pokemons[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const confirmDeleteSelected = () => {
    setDeletePokemonsDialog(true);
  };

  const deleteSelectedPokemons = () => {
    let _pokemons = pokemons.filter((val) => !selectedPokemons.includes(val));

    setPokemons(_pokemons);
    setDeletePokemonsDialog(false);
    setSelectedPokemons(null);
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Pokémons Deletados', life: 3000 });
  };

  const onInputChange = (e, nome) => {
    const val = (e.target && e.target.value) || '';
    let _pokemon = { ...pokemon };

    _pokemon[`${nome}`] = val;

    setPokemon(_pokemon);
  };

  const onInputNumberChange = (e, nome) => {
    const val = e.value || 0;
    let _pokemon = { ...pokemon };

    _pokemon[`${nome}`] = val;

    setPokemon(_pokemon);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="Adicionar" icon="pi pi-plus" severity="success" onClick={openNew} />
        <Button label="Deletar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPokemons || !selectedPokemons.length} />
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
  };

  const statusBodyTemplate = (rowData) => {
    console.log(rowData)
    return <Tag value={rowData.statusInventario} severity={getSeverity(rowData)}></Tag>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editPokemon(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeletePokemon(rowData)} />
      </React.Fragment>
    );
  };

  const getSeverity = (pokemon) => {
    switch (pokemon.statusInventario) {
      case 'Disponivel':
        return 'success';

      case 'Indisponivel':
        return 'warning';
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Pokedex</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );
  const pokemonDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Salvar" icon="pi pi-check" onClick={savePokemon} />
    </React.Fragment>
  );
  const pokemonDialogFooterEdit = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Salvar" icon="pi pi-check" onClick={savePokemonEdit} />
    </React.Fragment>
  );
  const deletePokemonDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePokemonDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deletePokemon} />
    </React.Fragment>
  );
  const deletePokemonsDialogFooter = (
    <React.Fragment>
      <Button label="Não" icon="pi pi-times" outlined onClick={hideDeletePokemonsDialog} />
      <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteSelectedPokemons} />
    </React.Fragment>
  );


  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        {/* Mostrando Tabela */}
        <DataTable ref={dt} value={pokemons} selection={selectedPokemons} onSelectionChange={(e) => setSelectedPokemons(e.value)}
          dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} pokémons" globalFilter={globalFilter} header={header}>
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="id" header="Id" sortable style={{ minWidth: '5rem' }}></Column>
          <Column field="nome" header="Nome" sortable style={{ minWidth: '14rem' }}></Column>
          <Column field="image" header="Image" body={imageBodyTemplate}></Column>
          <Column field="tipo" header="Tipo" sortable style={{ minWidth: '10rem' }}></Column>
          <Column field="peso" header="Peso" sortable style={{ minWidth: '5rem' }}></Column>
          <Column field="rating" header="Reviews" body={RatingComponent} style={{ minWidth: '12rem' }}></Column>
          <Column field="statusInventario" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

      {/* Adicionar */}
      <Dialog visible={pokemonDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Adicionar Pokémon" modal className="p-fluid" footer={pokemonDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="id" className="font-bold">
            Id
          </label>
          <InputText id="id" value={pokemon.id} onChange={(e) => onInputChange(e, 'id')} required autoFocus className={classNames({ 'p-invalid': submitted && !pokemon.id })} />
          {submitted && !pokemon.id && <small className="p-error">Id é obrigatório.</small>}
        </div>
        <div className="field">
          <label htmlFor="nome" className="font-bold">
            Nome
          </label>
          <InputText id="nome" value={pokemon.nome} onChange={(e) => onInputChange(e, 'nome')} className={classNames({ 'p-invalid': submitted && !pokemon.nome })} />
          {submitted && !pokemon.nome && <small className="p-error">Nome é obrigatório.</small>}
        </div>
        <div className="field">
          <label htmlFor="descricao" className="font-bold">
            Descrição
          </label>
          <InputTextarea id="descricao" value={pokemon.descricao} onChange={(e) => onInputChange(e, 'descricao')} rows={3} cols={20} />
        </div>

        <label htmlFor="image" className="font-bold">
          Imagem
        </label>
        <InputText placeholder='Insira o URL da imagem:' id="image" value={pokemon.image} onChange={(e) => onInputChange(e, 'image')} className={classNames({ 'p-invalid': submitted && !pokemon.image })} />

        <label htmlFor="tipo" className="font-bold">
          Tipo
        </label>
        <InputText id="tipo" value={pokemon.tipo} onChange={(e) => onInputChange(e, 'tipo')} required className={classNames({ 'p-invalid': submitted && !pokemon.tipo })} />
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="quantity" className="font-bold">
              Peso
            </label>
            <InputNumber id="peso" value={pokemon.peso} onValueChange={(e) => onInputNumberChange(e, 'peso')} />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="statusInventario" className="font-bold">
              Status
            </label>
            <div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="Disponivel" name="Disponivel" value="Disponivel" onChange={onStatusChange} checked={pokemon.statusInventario === 'Disponivel'} />
                <label htmlFor="Disponivel">Disponível</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="Indisponivel" name="Indisponivel" value="Indisponivel" onChange={onStatusChange} checked={pokemon.statusInventario === 'Indisponivel'} />
                <label htmlFor="Indisponivel">Indisponível</label>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Editar */}
      <Dialog visible={pokemonDialogEdit} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalhes do Pokémon" modal className="p-fluid" footer={pokemonDialogFooterEdit} onHide={hideDialog}>

        <div className="field">
          <label htmlFor="nome" className="font-bold">
            Nome
          </label>
          <InputText id="nome" value={pokemon.nome} onChange={(e) => onInputChange(e, 'nome')} required className={classNames({ 'p-invalid': submitted && !pokemon.nome })} />
          {submitted && !pokemon.nome && <small className="p-error">Nome é obrigatório.</small>}
        </div>
        <div className="field">
          <label htmlFor="descricao" className="font-bold">
            Descrição
          </label>
          <InputTextarea id="descricao" value={pokemon.descricao} onChange={(e) => onInputChange(e, 'descricao')} required rows={3} cols={20} />
        </div>

        <label htmlFor="image" className="font-bold">
          Imagem
        </label>
        <InputText placeholder='Insira o URL da imagem:' id="image" value={pokemon.image} onChange={(e) => onInputChange(e, 'image')} className={classNames({ 'p-invalid': submitted && !pokemon.image })} />
        <label htmlFor="tipo" className="font-bold">
          Tipo
        </label>
        <InputText id="tipo" value={pokemon.tipo} onChange={(e) => onInputChange(e, 'tipo')} required className={classNames({ 'p-invalid': submitted && !pokemon.tipo })} />
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="statusInventario" className="font-bold">
              Status
            </label>
            <div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="Disponivel" name="Disponivel" value="Disponivel" onChange={onStatusChange} checked={pokemon.statusInventario === 'Disponivel'} />
                <label htmlFor="Disponivel">Disponível</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="Indisponivel" name="Indisponivel" value="Indisponivel" onChange={onStatusChange} checked={pokemon.statusInventario === 'Indisponivel'} />
                <label htmlFor="Indisponivel">Indisponível</label>
              </div>
            </div>
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="peso" className="font-bold">
              Peso
            </label>
            <InputNumber id="peso" value={pokemon.peso} onValueChange={(e) => onInputNumberChange(e, 'peso')} />
          </div>
        </div>
      </Dialog>

      <Dialog visible={deletePokemonDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePokemonDialogFooter} onHide={hideDeletePokemonDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {pokemon && (
            <span>
              Você quer apagar <b>{pokemon.nome}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog visible={deletePokemonsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePokemonsDialogFooter} onHide={hideDeletePokemonsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {pokemon && <span>Você quer apagar os Pokémons selecionados?</span>}
        </div>
      </Dialog>
    </div>
  )
}

export default Home;

export function RatingComponent() {
  const [value, setValue] = useState(null);

  return (
    <div className="card flex justify-content-center">
      <Rating value={value} cancel={false} onChange={(e) => setValue(e.value)} />
    </div>
  );
}