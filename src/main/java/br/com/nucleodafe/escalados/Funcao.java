package br.com.nucleodafe.escalados;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "Funcao")
@NamedQueries({
		@NamedQuery(name = "Funcao.findByPartialNome", query = "select f from Funcao f where f.nome like :nome"),
		@NamedQuery(name = "Funcao.findByNome", query = "select f from Funcao f where f.nome = :nome"),
		@NamedQuery(name = "Funcao.findByMinisterio", query = "select f from Funcao f where f.ministerio = :ministerio"), })
@XmlRootElement
public class Funcao implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idFuncao", updatable = false, nullable = false)
	private Long id;

	@Column
	@NotNull
	@Size(min = 2, max = 60)
	private String nome;

	@ManyToOne
	@JoinColumn(name = "idMinisterio", nullable = false)
	@NotNull
	private Ministerio ministerio;
	
	@ManyToMany
	@JoinTable(
			   name = "Funcao_Escalado", 
			   joinColumns = @JoinColumn(name = "idFuncao", referencedColumnName = "idFuncao"), 
			   inverseJoinColumns = @JoinColumn(name = "idEscalado", referencedColumnName="idEscalado")
			 )
//	@JsonManagedReference
	private List<Escalado> escalados = new ArrayList<Escalado>();
	
	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (nome != null && !nome.trim().isEmpty())
			result += "descricao: " + nome;
		return result;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Funcao other = (Funcao) obj;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		return true;
	}

	public Ministerio getMinisterio() {
		return this.ministerio;
	}

	public void setMinisterio(final Ministerio ministerio) {
		this.ministerio = ministerio;
	}

	public List<Escalado> getEscalados() {
		return escalados;
	}

	public void setEscalados(List<Escalado> escalados) {
		this.escalados = escalados;
	}

}