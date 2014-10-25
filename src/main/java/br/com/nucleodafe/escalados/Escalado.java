package br.com.nucleodafe.escalados;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.validator.constraints.Email;

@Entity
@Table(name = "Escalado")
@NamedQueries({
		@NamedQuery(name = "Escalado.findByPartialNome", query = "select e from Funcao e where e.nome like :nome"),
		@NamedQuery(name = "Escalado.findByNome", query = "select e from Funcao e where e.nome = :nome"),
		@NamedQuery(name = "Escalado.findByPartialSobrenome", query = "select e from Funcao e where e.nome like :sobrenome"),
		@NamedQuery(name = "Escalado.findBySobrenome", query = "select e from Funcao e where e.nome like :sobrenome"),
		@NamedQuery(name = "Escalado.findByPartialEmail", query = "select e from Funcao e where e.nome like :email"),
		@NamedQuery(name = "Escalado.findByEmail", query = "select e from Funcao e where e.nome like :email"),
		@NamedQuery(name = "Escalado.findByPartialCelular1", query = "select e from Funcao e where e.nome like :celular1"),
		@NamedQuery(name = "Escalado.findByCelular1", query = "select e from Funcao e where e.nome like :celular1"),
		@NamedQuery(name = "Escalado.findByPartialCelular2", query = "select e from Funcao e where e.nome like :celular2"),
		@NamedQuery(name = "Escalado.findByCelular2", query = "select e from Funcao e where e.nome like :celular2"),
		@NamedQuery(name = "Escalado.findByPartialCelular3", query = "select e from Funcao e where e.nome like :celular3"),
		@NamedQuery(name = "Escalado.findByCelular3", query = "select e from Funcao e where e.nome like :celular3"),
		@NamedQuery(name = "Escalado.findByAtivo", query = "select e from Funcao e where e.nome like :ativo") })
@XmlRootElement
public class Escalado implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idEscalado", updatable = false, nullable = false)
	private Long id;

	@Column
	@Size(min = 2, max = 50)
	@NotNull
	private String nome;

	@Column
	@Size(min = 2, max = 50)
	@NotNull
	private String sobrenome;

	@Column
	@Email
	private String email;

	@Column
	@Size(max = 20)
	private String celular1;

	@Column
	@Size(max = 20)
	private String celular2;

	@Column
	@Size(max = 20)
	private String celular3;

	@Column
	@Temporal(TemporalType.DATE)
	private Date aniversario;
	
	@Column
	@Size(max = 40)
	private String facebook;
	
	@Column
	@Size(max = 30)
	private String twitter;
	
	@Column
	private boolean ativo;

//	@ManyToMany(mappedBy = "escalados", fetch = FetchType.EAGER)
//	@JsonBackReference
//	@JsonIgnore
//	private Set<Funcao> Funcoes = new HashSet<Funcao>();

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		result = prime * result
				+ ((sobrenome == null) ? 0 : sobrenome.hashCode());
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
		Escalado other = (Escalado) obj;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		if (sobrenome == null) {
			if (other.sobrenome != null)
				return false;
		} else if (!sobrenome.equals(other.sobrenome))
			return false;
		return true;
	}

	public String getCelular1() {
		return celular1;
	}

	public void setCelular1(String celular1) {
		this.celular1 = celular1;
	}

	public String getCelular2() {
		return celular2;
	}

	public void setCelular2(String celular2) {
		this.celular2 = celular2;
	}

	public String getCelular3() {
		return celular3;
	}

	public void setCelular3(String celular3) {
		this.celular3 = celular3;
	}

	public Date getAniversario() {
		return aniversario;
	}

	public void setAniversario(Date aniversario) {
		this.aniversario = aniversario;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

//	public Set<Funcao> getFuncoes() {
//		return Funcoes;
//	}
//
//	public void setFuncoes(Set<Funcao> funcoes) {
//		Funcoes = funcoes;
//	}

	public String getFacebook() {
		return facebook;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	public String getTwitter() {
		return twitter;
	}

	public void setTwitter(String twitter) {
		this.twitter = twitter;
	}

	@Override
	public String toString() {
		return "Escalado [id=" + id + ", nome=" + nome + ", sobrenome="
				+ sobrenome + ", email=" + email + ", celular1=" + celular1
				+ ", celular2=" + celular2 + ", celular3=" + celular3
				+ ", aniversario=" + aniversario + ", facebook=" + facebook
				+ ", twitter=" + twitter + ", ativo=" + ativo + "]";
	}

}