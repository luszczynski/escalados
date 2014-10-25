package br.com.nucleodafe.escalados;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name = "Ministerio")
@NamedQueries({
		@NamedQuery(name = "Ministerio.findByPartialName", query = "select m from Ministerio m where m.nome like :nome"),
		@NamedQuery(name = "Ministerio.findByName", query = "select m from Ministerio m where m.nome = :nome"), })
@XmlRootElement
public class Ministerio implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idMinisterio", updatable = false, nullable = false)
	private Long id;

	@Column
	@NotNull
	@Size(min = 2, max = 50)
	private String nome;

	@OneToMany(mappedBy = "ministerio", fetch = FetchType.EAGER)
	@JsonIgnore
	private List<Funcao> funcoes = new ArrayList<Funcao>();

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

	public List<Funcao> getFuncoes() {
		return funcoes;
	}

	public void setFuncoes(List<Funcao> funcoes) {
		this.funcoes = funcoes;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (nome != null && !nome.trim().isEmpty())
			result += "nome: " + nome;
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
		Ministerio other = (Ministerio) obj;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		return true;
	}

}